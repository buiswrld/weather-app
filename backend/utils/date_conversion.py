from typing import Any, Dict, List, Tuple
from datetime import datetime, timedelta

def convert_to_yyyy_mm_dd(date_str: str) -> datetime:
    """
    Converts a date string in the format 'Weekday, Month DD, YYYY HH:MM' to a datetime object in the form yyyy-mm-dd.

    Args:
    - date_str (str): The date string to be converted.

    Returns:
    - datetime: The converted datetime object in the form yyyy-mm-dd.

    Raises:
    - ValueError: If the date string is not in the expected format.
    """
    try:
        date_obj = datetime.strptime(date_str, '%A, %B %d, %Y %H:%M')
        return date_obj
    except ValueError:
        raise ValueError("Invalid date format. Use 'Weekday, Month DD, YYYY HH:MM'.")

def parse_date_range(start_date_str: str, end_date_str: str) -> Tuple[datetime, datetime]:
    """
    Parses the start and end date strings and converts them to datetime objects. Essentially a wrapper for convert_to_yyyy_mm_dd on both start_date and end_date

    Args:
    - start_date_str (str): The start date string.
    - end_date_str (str): The end date string.

    Returns:
    - tuple: A tuple containing the start and end datetime objects.

    Raises:
    - ValueError: If the date strings are not in the expected format.
    """
    try:
        start_date = convert_to_yyyy_mm_dd(start_date_str)
        end_date = convert_to_yyyy_mm_dd(end_date_str)
    except ValueError:
        raise ValueError("Invalid date format. Use 'Weekday, Month DD, YYYY HH:MM'.")
    return start_date, end_date

def adjust_date_for_timezone(date: datetime, offset_sec: int) -> datetime:
    """
    Adjusts a datetime object for a given timezone offset in seconds.

    Args:
    - date (datetime): The original datetime object.
    - offset_sec (int): The timezone offset in seconds.

    Returns:
    - datetime: The adjusted datetime object. Accounts for days as well.
    """
    return date + timedelta(seconds=offset_sec)

def filter_data_by_date_range(data: List[Dict[str, Any]], start_date: datetime, end_date: datetime) -> List[Dict[str, Any]]:
    """
    Filters a list of data entries by a date range. Helper function for process_date_range_and_filter_data.

    Args:
    - data (list): A list of dictionaries containing data entries.
    - start_date (datetime): The start date of the range.
    - end_date (datetime): The end date of the range.

    Returns:
    - list: A list of dictionaries containing data entries exclusively within the date range.
    """
    start_date = start_date.date()
    end_date = end_date.date()
    filtered_data = []
    for entry in data:
        entry_date = datetime.strptime(entry['date'], '%Y-%m-%d').date()
        if start_date <= entry_date <= end_date:
            filtered_data.append(entry)
    return filtered_data

def process_date_range_and_filter_data(data: List[Dict[str, Any]], start_date_str: str, end_date_str: str, offset_sec: int) -> List[Dict[str, Any]]:
    """
    Processes a date range, adjusts for timezone, and filters data entries by the date range. Intended for use in API endpoints.

    Args:
    - data (list): A list of dictionaries containing data entries.
    - start_date_str (str): The start date string.
    - end_date_str (str): The end date string.
    - offset_sec (int): The timezone offset in seconds.

    Returns:
    - list: A list of dictionaries containing data entries within the adjusted date range.

    Raises:
    - ValueError: If the date strings are not in the expected format.
    """
    try:
        start_date, end_date = parse_date_range(start_date_str, end_date_str)
        start_date = adjust_date_for_timezone(start_date, offset_sec)
        end_date = adjust_date_for_timezone(end_date, offset_sec)
    except ValueError as e:
        raise ValueError(str(e))
    
    filtered_data = filter_data_by_date_range(data, start_date, end_date)

    if not filtered_data:
        start_date += timedelta(days=1)
        end_date += timedelta(days=1)
        filtered_data = filter_data_by_date_range(data, start_date, end_date)

    return filtered_data