require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const reader = require('xlsx');
const upload  = require("express-fileupload");

const app  = express();
app.use(upload());
const cors=require("cors");
const corsOptions ={
   origin:'*',
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json({
   type: ['application/json', 'text/plain']
}))

mongoose.connect(process.env.MONGODBURL);
 // mongoose.set('useCreateIndex', true);

  // const userSchema= new mongoose.Schema({
  //   fname: String,
  //   lname: String,
  //   username: String,
  //   password: String,
  //   thts:[]
  // });

  const studentSchema = new mongoose.Schema({
    StudentID: String,
    StudentName: String,
    CoursesEnrolled:Array
  });

  const seatingSchema = new mongoose.Schema({
    studentID:String,
    studentName: String,
    course:String,
    hallNo : Number,
    seat:Number
  });


//  const User = mongoose.model("User", userSchema);
    const Student = mongoose.model("Student",studentSchema);

    const SeatPlan = mongoose.model("seating",seatingSchema);

  // const invgSchema = new mongoose.Schema({
  //   ID: String,
  //   Name: String
  //
  // });
  //
  // const Invg = mongoose.model("Invigilator",invgSchema);





  // custom get requests from react that will be handled here to send back seating plan.

  // app.get("/",function(req,res){
  //
  //   SeatPlan.find({}, function(err,foundusers){
  //
  //       if(err){
  //
  //         console.log(err);
  //       }
  //       else{
  //         res.send(foundusers);
  //         //console.log(foundusers)
  //       }
  //     });
  // });

// to store course file

// app.post("/courselist",function(req,res){
//   var det = req.files.course;
//   var filename = det.name;
//   console.log(filename);
//   det.mv('./'+filename,function(err){
//     if(err){
//       console.log(err);
//     }
//     else{
//       console.log("success");
//     }
//   })
//
// })

// checking the merger
// app.post("/check",function(req,res){
//   console.log("hiiiiiiiiiiiiii");
//   console.log(req.body);
// })

console.log("Reading Empty Record file");
const file = reader.readFile('./record.xlsx')
console.log( file.SheetNames.length);

// we will try to create a xlsx file of seating plan as well.


 // to populate the seating database with a seating plan of a specific subject
  app.post("/",function(req,res){





    // creating seating plan
    const file2 = reader.readFile("./course.xlsx")
    let adder = file.SheetNames.length+1;
    console.log(adder);
      // use the course name to pick students from database
     let year = req.body.currentBatchYear;
     let x = req.body.courseYear;
     var sem;
     if(x.length===9){
       sem = "Odd";
     }
     else{
       sem = "Even";
     }
     //let sem = req.body.sname;
     let courses = [];
     let fullcourses = [];
     let branch  = req.body.currentBranchName;
  //   console.log(year)
     const sheets = file2.SheetNames;
     for(let i = 0; i < sheets.length; i++)
               {
                   const temp = reader.utils.sheet_to_json(
                   file2.Sheets[file2.SheetNames[i]])
                   temp.forEach((res) => {
                     //console.log(year+sem+branch)
                    // console.log( "all "+res.year +" "+ res.semester+" "+res.branch)
                    // console.log("nee "+year +" "+ sem+" "+branch)
                    if(branch==="All"){
                      if(year=="1"){
                        if(res.semester === sem  && res.year == year && res.branch==="CSE" ){
                         // console.log("Op bhai Op")
                          courses.push(res.coursecode);
                          fullcourses.push(res.coursename);
                        }
                      }
                      else{
                        if(res.semester === sem  && res.year == year ){
                         // console.log("Op bhai Op")
                          courses.push(res.coursecode);
                          fullcourses.push(res.coursename);
                        }
                      }

                    }
                    else{
                      if(res.semester === sem && res.branch === branch && res.year == year){
                       // console.log("Op bhai Op")
                        courses.push(res.coursecode);
                        fullcourses.push(res.coursename);
                      }
                    }


                      })
                }

     console.log(courses);
     console.log(fullcourses);

     const dates = [];
     var start = req.body.startDate;
     console.log(start);
     // creating a schedule
     var ar = new Array();
     var dt = new Date(start);
     var j = 1;
     var cnt = courses.length;
     while (j <= cnt) {
         ar.push(new Date(dt));
         dt.setDate(dt.getDate() + 2);
         j++;
     }
     for (var j = 0; j < ar.length; j++) {
         dates.push(ar[j].toLocaleDateString());
     }
     console.log(dates);
     console.log(courses);
     console.log(ar.length);
     const schedule = [];
     for (var j = 0; j < dates.length; j++) {
         let subject = courses[j];
         let date = dates[j];
         let obj = {
             "courseID": subject,
             "courseName":fullcourses[j],
             "date": date,
             "Timeslot" : req.body.startTime
         };
         schedule.push(obj);
     }
     const file3 = reader.readFile('./schedule.xlsx')
     const wss = reader.utils.json_to_sheet(schedule)
     var sheetNamee = req.body.currentBatchYear+"year_"+req.body.currentBranchName+"_"+req.body.currentExamName;
     // console.log(num);
     console.log(sheetNamee);
     reader.utils.book_append_sheet(file3, wss, sheetNamee);
     reader.writeFile(file3, './schedule.xlsx')

     var  k = 20;
      courses.map((exam,index)=>{


        Student.find({CoursesEnrolled:exam},function(err,result){
          if(err){
            console.log(err);
          }
          else{
            //console.log(result);
            let arr =[] ;
            // result.map((x)=>{
            //
            // })

            let i =1;
            let h=1;
            result.map((x)=>{
              let obj = {
                studentID:x.StudentID, studentName:x.StudentName,course:exam,courseName:fullcourses[index], LTnumber:h,seat: i
              }
              arr.push(obj);
              console.log("Assigned a new seat to ID"+x.StudentID)
              var seat = new SeatPlan({ studentID:x.StudentID, studentName:x.StudentName,course:exam, LTNumber:h,seat: i });
              // seat.save(function (err, book) {
              // if (err) return console.error(err);
              //       console.log( "saved a seat.");
              //     });
               i=i+2;
               if(i>50){
                 h=h+1;
                 i=1;
               }
            })

            const ws = reader.utils.json_to_sheet(arr)
          //  console.log("hello " + index);
            var num = index+adder;
            var sheetName = exam+"_"+num.toString();
            console.log(num);
            console.log(sheetName);
            reader.utils.book_append_sheet(file,ws,sheetName);
            reader.writeFile(file,'./record.xlsx')
          }
        });

        k = k+1;
      })




  });



// to download the pdf

app.get("/downloadseating",function(req,res){
    res.download("./record.xlsx");
})
app.get("/downloadtimetable",function(req,res){
    res.download("./schedule.xlsx");
})

  app.listen(5000,function(){
    console.log("server started at  port 5000")
  })
