from datetime import datetime
from collections.abc import Tuple, List, Dict, Any

def parse_date_range(start_date_str: str, end_date_str: str) -> Tuple[datetime, datetime]:
    try:
        start_date = datetime.strptime(start_date_str, '%Y-%m-%d')
        end_date = datetime.strptime(end_date_str, '%Y-%m-%d')
    except ValueError:
        raise ValueError("Invalid date format. Use yyyy-mm-dd.")
    return start_date, end_date


def filter_data_by_date_range(data: List[Dict[str, Any]], start_date: datetime, end_date: datetime) -> List[Dict[str, Any]]:
    return [entry for entry in data if start_date <= datetime.strptime(entry['date'], '%Y-%m-%d') < end_date]