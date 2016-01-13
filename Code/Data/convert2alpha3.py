import json
from iso3166 import countries

jsonfile = open('Data files/filteredtradeflows.json', 'rU')
with open('Data files/convertedtradeflows.json', 'w') as convertedjson:

	data = json.load(jsonfile)
	imports = {}
	exports = {}
	for year in range(1870,2009 + 1):
		imports[year] = {}
		exports[year] = {}
		for line in data:
			if int(line['year']) == year:
				imports[year][countries.get(line['importer1']).alpha3] = round(imports[year].get(countries.get(line['importer1']).alpha3, 0) + (max(0,float(line['flow1']))),2)
				imports[year][countries.get(line['importer2']).alpha3] = round(imports[year].get(countries.get(line['importer2']).alpha3, 0) + (max(0,float(line['flow2']))),2)
				exports[year][countries.get(line['importer1']).alpha3] = round(exports[year].get(countries.get(line['importer1']).alpha3, 0) + (max(0,float(line['flow2']))),2)
				exports[year][countries.get(line['importer2']).alpha3] = round(exports[year].get(countries.get(line['importer2']).alpha3, 0) + (max(0,float(line['flow1']))),2)	

	exportcountrylist = []
	importcountrylist = []
	dict = {'Exports':exports,'Imports':imports}
	json.dump(dict,convertedjson, indent=True)
	

	# exportlist = []
	# importlist = []
	# string = ""
	# string += ('[')
	# for year in range(1870,2009 + 1):
	# 	exportcountrylist.append(exports[year].keys())
	# 	importcountrylist.append(imports[year].keys())
	# 	exportlist.append(exports[year].values())
	# 	importlist.append(imports[year].values())
	# 	for i in range(len(imports[year])):
	# 		string += ("{\"year\":\""+str(year)+"\",\"country\":\""+exportcountrylist[year-1870][i])
	# 		string += ("\",\"export\":\""+str(exportlist[year-1870][i])+"\",\"import\":\""+str(importlist[year-1870][i])+"\"},\n")
	# string = string[:-2]
	# string += ("\n]")
	# convertedjson.write(string)

