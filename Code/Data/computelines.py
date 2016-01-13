import json
from iso3166 import countries
import operator

print "We create the dict..."
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
				key1 = countries.get(line['importer1']).alpha3
				key2 = countries.get(line['importer2']).alpha3
				FromBToA = round((max(0,float(line['flow2']))),2)
				FromAToB = round((max(0,float(line['flow1']))),2)
				if key1 in imports[year]:
					imports[year][key1][key2] = FromBToA
				else:
					imports[year][key1] = {key2:FromBToA}
				if key1 in exports[year]:
					exports[year][key1][key2] = FromAToB
				else:
					exports[year][key1] = {key2:FromAToB}

				if key2 in imports[year]:
					imports[year][key2][key1] = FromAToB
				else:
					imports[year][key2] = {key1:FromAToB}
				if key2 in exports[year]:
					exports[year][key2][key1] = FromBToA
				else:
					exports[year][key2] = {key1:FromBToA}
	print "Now we change it"
	for year in range(1870,2009+1):
		for country in imports[year]:
			temp = sorted(imports[year][country].items(), key=operator.itemgetter(1))
			temp.reverse()
			imports[year][country] = temp[:5]
		for country in exports[year]:
			temp = sorted(exports[year][country].items(), key=operator.itemgetter(1))
			temp.reverse()
			exports[year][country] = temp[:5]

	dict = {'Exports':exports,'Imports':imports}
	json.dump(dict,countrylines, indent=True)