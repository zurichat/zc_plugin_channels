import json


def find_item_in_data(data, value, key):
	result_query = []
	for item in data:
		for key in item:
			if value in item[key].lower():
				result_query.append(item)

	return result_query