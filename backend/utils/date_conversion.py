from datetime import datetime
from typing import Any, Dict, List, Tuple

def parse_date_range(start_date_str: str, end_date_str: str) -> Tuple[datetime, datetime]:
    try:
        start_date = convert_to_yyyy_mm_dd(start_date_str)
        end_date = convert_to_yyyy_mm_dd(end_date_str)
    except ValueError:
        raise ValueError("Invalid date format. Use yyyy-mm-dd.")
    return start_date, end_date


def filter_data_by_date_range(data: List[Dict[str, Any]], start_date: datetime, end_date: datetime) -> List[Dict[str, Any]]:
    filtered_data = []
    for entry in data:
        entry_date = datetime.strptime(entry['date'], '%Y-%m-%d')
        if start_date <= entry_date <= end_date:
            filtered_data.append(entry)
    return filtered_data


def process_date_range_and_filter_data(data: List[Dict[str, Any]], start_date_str: str, end_date_str: str) -> List[Dict[str, Any]]:
    try:
        start_date, end_date = parse_date_range(start_date_str, end_date_str)
    except ValueError as e:
        raise ValueError(str(e))

    return filter_data_by_date_range(data, start_date, end_date)

def convert_to_yyyy_mm_dd(date_str: str) -> str:
    try:
        date_obj = datetime.strptime(date_str, '%A, %B %d, %Y')
        return date_obj
    except ValueError:
        raise ValueError("Invalid date format. Use 'Day, Month dd, yyyy'.")