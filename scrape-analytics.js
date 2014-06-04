(function(){
    var request = require('request');
    var cheerio = require('cheerio');
    var pg = require('pg');
    //var conString = "postgres://username:password@localhost/database";
    //var client = new pg.Client(conString);

    var url = 'http://www.torsc.org.tw/'
    var i;
    var json = new Array();
    //scrap organ donation statistics
    request(url, function( error, response, html){
        if(!error && response.statusCode === 200){
            //parse html file
            var $ = cheerio.load(html);
            $("div.statisticsContent1 tr").each(function(i, element){

                var title  = $(this).find('td.titleTD').text().replace(/(\r\n|\n|\r)/gm,"");
                var number = $(this).find('td.numTD').text().replace(/(\r\n|\n|\r)/gm,"");
                if(i!=0){
                    var row = {
                        organ: title,
                        number: number
                    };
                }
                if(i===0){
                    var row = {
                        title: title,
                        number: number
                    };
                }
                console.log(row);
            });
            //console.log(json);
            //save to database
            //
            //    client.connect(function(err){
            //        if(err){
            //            console.log("can't connect to postgres");
            //            throw err;
            //        }
            //        client.query('SELECT NOW() AS "theTime"', function(err, result){
            //            if(err){
            //                console.log("query error");
            //                throw err;
            //            }
            //        }
            //        console.log(result.rows[0].theTime);
            //        client.end();
            //    });
            //});
        }
    });

}());
