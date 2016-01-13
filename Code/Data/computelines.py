import json
from iso3166 import countries

jsonfile = open('Data files/filteredtradeflows.json', 'rU')
with open('Data files/countrylines.json', 'w') as countrylines:
	data = json.load(jsonfile)
	imports = {}
	exports = {}
	for year in range(1870,2009 + 1):
		imports[year] = {}
		exports[year] = {}
		for line in data:
			if int(line['year']) == year:
				imports[year][countries.get(line['importer1']).alpha3] = {countries.get(line['importer2']).alpha3:round((max(0,float(line['flow2']))),2)}
