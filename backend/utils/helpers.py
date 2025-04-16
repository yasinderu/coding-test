def filter_data(filter_param, data, value):
    for item in data:
        if item[filter_param] == value:
            return item
    else:
        return None