var MongoClient=require('mongodb').MongoClient;

class MLmodel
{
    checkSearchQuery(msg)
    {

        var regExpText=/((\w|\s)\=(\w|\s).*)/;


        var isAttack=regExpText.test(msg);

        if(isAttack)
        {
            //Mongodb Connect
        const MongoClient = require('mongodb').MongoClient;
        const uri = "mongodb+srv://samitha:samithadb@cluster0.l7uuz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        let collectionText;
        client.connect(err => {
        collectionText = client.db("sqlattack_records").collection("cloud_project");
        // perform actions on the collection object
        console.log("Connected");
        //console.log(collectionText.find().count());
        var doc_count=collectionText.countDocuments()._id;

        var currentdate=new Date();
        var obj={
            "_id":doc_count,
            "date":currentdate.getDate()+"/"+ (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds(),
            "interface":"search",
            "attack_string":msg
        };

        collectionText.insertOne(obj,function(err,res){
            if(err) throw err;
            console.log("1 document inserted");
            client.close();
        });

        //client.close();
        });
        }
        
        

        return isAttack;
    }

    viewAttackRecords(res)
    {
        var str="<table border='1'><tr><th>Date Time</th><th>Interface</th><th>Attack Query</th></tr>";
        const MongoClient = require('mongodb').MongoClient;
        const uri = "mongodb+srv://samitha:samithadb@cluster0.l7uuz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        let collectionText;

        client.connect(err => {
            collectionText = client.db("sqlattack_records").collection("cloud_project");
            // perform actions on the collection object
            console.log("Connected");

            var cursor= collectionText.find();
            cursor.forEach(function(d_rec){
            
            str=str+"<tr><td>"+d_rec.date+"</td><td>"+d_rec.interface+"</td><td>"+d_rec.attack_string+"</td></tr>";
            

            },function(){
            client.close();
            //return str;
            res.send(str+"</table>");
            
            });

            
            
        });


    }


}

module.exports=MLmodel