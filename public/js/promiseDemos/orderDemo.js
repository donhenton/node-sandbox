 'use strict'
 class JustAtTheEndDemo
 {
     /**
      * the constructor takes 2 jquery refs, one to the step reporting 
      * location, one to the final information location
      * 
      */
     constructor(stepElem,infoElem,actionButtonElem)
     {
         this.classNames = {"arts": ["Geography", "English", "Social Studies", "French", "Drawing"],
                            "sciences": ["Math", "Science", "API Trig", "Chemistry", "Physics"]};
        
         this.testData = [{type: "arts", userId: 3}, 
             {type: "sciences", userId: 2}, 
             {type: "sciences", userId: 1}]

        this.stepCounter = 0;
        this.mainObject = []; 
        this.stepElement = stepElem;
        this.infoElem = infoElem;
        this.actionButtonElem = actionButtonElem;
         
     }
     
     clearReportingArea()
     {
        this.stepElement.empty();
        this.infoElem.empty();
         
     }
     
    announceStepComplete(userId,message)
    {
        this.stepCounter ++;
        this.stepElement.append('<li>'+message+'</li>')
        if (this.stepCounter === this.testData.length)
        {
            this.infoElem.html(JSON.stringify(this.mainObject));
            this.actionButtonElem.prop('disabled', false);
        }
        
    }
     
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
     
    getScores(type, userId, holder)
    {
        let classNamesList = this.classNames[type];
        
        let startTime = new Date().getTime();
        let scores = []
        let ct = this.getRandomInt(1, classNamesList.length - 1);
       // console.log("ct "+ct)
        for (var j = 0; j < ct; j++)
        {
            let score = this.getRandomInt(45, 99);
            let classSelector = this.getRandomInt(0, classNamesList.length - 1);
            let studentClass = classNamesList[classSelector];
            scores.push({className: studentClass, score: score});


        }
       // console.log("1")
        let p = new Promise((resolve, reject) => {
        setTimeout(() => {

            //console.log("holder "+JSON.stringify(holder))
            holder.push({userId: userId, type: type, scores: scores})
            let endTime = new Date().getTime();
            let message = "finishing " + userId + " " + (endTime - startTime) + " ms ";
             
            this.announceStepComplete(userId,message);
            
            resolve(true);
            

        }, this.getRandomInt(1500,3500))
    })

     //console.log("p is "+(typeof p))
     return p;
        
        
    }   
    
    
    doDemo()
    {
        
        this.stepCounter = 0;
        this.mainObject = []; 
        this.actionButtonElem.prop('disabled', true);
         
        this.testData.forEach((current) => {
            this.getScores(current.type, current.userId, this.mainObject);
        })
    }
     
     
 }


function runJustAtTheEnd()
{
     let stepElem = $('#stepList');
     let infoElem = $('#infoBox');
     let actionButtonElem = $('#justAtEnd')
     let runAtEnd = new JustAtTheEndDemo(stepElem,infoElem,actionButtonElem);
     runAtEnd.clearReportingArea();

     stepElem.append("<li>Starting...</li>")

     
     runAtEnd.doDemo();
}