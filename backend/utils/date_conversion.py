from typing import Any, Dict, List, Tuple
from datetime import datetime, timedelta

def parse_date_range(start_date_str: str, end_date_str: str) -> Tuple[datetime, datetime]:
    try:
        start_date = convert_to_yyyy_mm_dd(start_date_str)
        end_date = convert_to_yyyy_mm_dd(end_date_str)
    except ValueError:
        raise ValueError("Invalid date format. Use 'Weekday, Month DD, YYYY HH:MM:SS'.")
    return start_date, end_date

def adjust_date_for_timezone(date: datetime, offset_sec: int) -> datetime:
    return date + timedelta(seconds=offset_sec)

def filter_data_by_date_range(data: List[Dict[str, Any]], start_date: datetime, end_date: datetime) -> List[Dict[str, Any]]:
    start_date = start_date.date()
    end_date = end_date.date()
    filtered_data = []
    for entry in data:
        entry_date = datetime.strptime(entry['date'], '%Y-%m-%d').date()
        if start_date <= entry_date <= end_date:
            filtered_data.append(entry)
    return filtered_data

def process_date_range_and_filter_data(data: List[Dict[str, Any]], start_date_str: str, end_date_str: str, offset_sec: int) -> List[Dict[str, Any]]:
    try:
        start_date, end_date = parse_date_range(start_date_str, end_date_str)
        start_date = adjust_date_for_timezone(start_date, offset_sec)
        end_date = adjust_date_for_timezone(end_date, offset_sec)
    except ValueError as e:
        raise ValueError(str(e))
    
    filtered_data = filter_data_by_date_range(data, start_date, end_date)

    if not filtered_data:
        # If no data is returned, offset the time filter by one day and try again
        start_date += timedelta(days=1)
        end_date += timedelta(days=1)
        filtered_data = filter_data_by_date_range(data, start_date, end_date)

    return filtered_data

def convert_to_yyyy_mm_dd(date_str: str) -> datetime:
    try:
        date_obj = datetime.strptime(date_str, '%A, %B %d, %Y %I:%M %p')
        date_obj = date_obj.replace(second=0)
        return date_obj
    except ValueError:
        raise ValueError("Invalid date format. Use 'Weekday, Month DD, YYYY HH:MM:SS'.")