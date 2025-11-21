from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response

import pandas as pd
from pathlib import Path

# BASE_DIR = backend folder (where manage.py is)
BASE_DIR = Path(__file__).resolve().parent.parent
SAMPLE_XL = BASE_DIR / 'data' / 'sample_real_estate.xlsx'


def load_default_df():
    try:
        return pd.read_excel(SAMPLE_XL)
    except Exception:
        return pd.DataFrame()


def normalize_df(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df.columns = [c.strip().lower() for c in df.columns]
    return df


def extract_area_from_query(query: str, df: pd.DataFrame) -> str:
    """
    Try to detect a known area name inside the user's query.
    Falls back to the raw query if nothing matches.
    """
    if not query:
        return ""

    q_lower = query.lower()

    # Look for any known area present in the query text
    for raw_area in df['area'].dropna().unique():
        area_str = str(raw_area)
        if area_str.lower() in q_lower:
            return area_str

    # Fallback: just trim the query
    return query.strip()



def make_summary(filtered_df: pd.DataFrame, area: str) -> str:
    """
    Build a clean, human–readable summary for the selected area.
    """
    if filtered_df.empty:
        return f"No data found for '{area}'."

    # average price
    avg_price = filtered_df['price'].mean()

    # years covered
    years = sorted(filtered_df['year'].unique())
    # convert to plain Python ints for nice display
    years = [int(y) for y in years]

    if len(years) == 1:
        years_str = str(years[0])
    else:
        years_str = f"{years[0]}–{years[-1]}"

    # simple trend detection
    by_year = filtered_df.groupby('year')['price'].mean().sort_index()
    if len(by_year) > 1 and by_year.diff().iloc[-1] > 0:
        trend_sentence = "increasing over the years"
    elif len(by_year) > 1 and by_year.diff().iloc[-1] < 0:
        trend_sentence = "decreasing over the years"
    else:
        trend_sentence = "mostly stable over the years"

    # final formatted text
    summary = (
        f"{area} shows an average price of ₹{avg_price:,.0f}. "
        f"The dataset covers the years {years_str}. "
        f"Overall, prices appear {trend_sentence}."
    )

    return summary



@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def query_view(request):
    """
    Accepts:
      - 'query' (text)
      - optional 'file' (Excel)

    Returns:
      - summary: string
      - chart_data: { labels: [...], price: [...], demand: [...] }
      - table: list of rows
    """
    query = request.data.get('query', '')

    # Load Excel: either uploaded file or default sample
    if 'file' in request.FILES:
        excel_file = request.FILES['file']
        df = pd.read_excel(excel_file)
    else:
        df = load_default_df()

    df = normalize_df(df)

    required_cols = {'year', 'area', 'price', 'demand'}
    if not required_cols.issubset(set(df.columns)):
        return Response(
            {"error": f"Excel must contain columns: {required_cols}"},
            status=400
        )

    area = extract_area_from_query(query, df)

    if area:
        filtered = df[df['area'].str.contains(area, case=False, na=False)]
    else:
        filtered = df

    if filtered.empty:
        return Response({
            "summary": f"No data found for '{area}'.",
            "chart_data": {"labels": [], "price": [], "demand": []},
            "table": []
        })

    chart_df = (
        filtered.groupby('year')
        .agg({'price': 'mean', 'demand': 'sum'})
        .reset_index()
        .sort_values('year')
    )

    labels = chart_df['year'].astype(str).tolist()
    price = chart_df['price'].round(2).tolist()
    demand = chart_df['demand'].tolist()

    summary = make_summary(filtered, area or "all areas")
    table_json = filtered.to_dict(orient='records')

    return Response({
        "summary": summary,
        "chart_data": {
            "labels": labels,
            "price": price,
            "demand": demand,
        },
        "table": table_json,
    })

