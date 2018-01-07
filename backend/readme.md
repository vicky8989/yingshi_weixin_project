#backend project

#包管理
cd myproject
npm init
npm install mongodb --save
npm install jssha --save
npm install express --save
npm install body-parser --save
npm install cookie-parser --save
npm install multer --save
#npm install socket.io

#mongodb启动
cd /Users/CastingJ/mongodb/bin 
./mongod --dbpath=../data/db

#mogodb 导出数据
mongoexport -d dbname -c collectionname -o file --type json/csv -f field
参数说明：
	-d ：数据库名
	-c ：collection名
	-o ：输出的文件名
	--type ： 输出的格式，默认为json
	-f ：输出的字段，如果-type为csv，则需要加上-f "字段名"

...bin>mongoexport -d vote -c activity -o activity.dat

#mogodb 导入数据
mongoimport -d dbname -c collectionname --file filename --headerline --type json/csv -f field
参数说明：
	-d ：数据库名
	-c ：collection名
	--type ：导入的格式默认json
	-f ：导入的字段名
	--headerline ：如果导入的格式是csv，则可以使用第一行的标题作为导入的字段
	--file ：要导入的文件
	
...bin>mongoimport -d vote -c user --file export/user.dat

