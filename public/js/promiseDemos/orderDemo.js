 'use strict'
 class JustAtTheEndDemo
 {
     /**
      * the constructor takes a callback to report the steps of the process
      * 
      */
     constructor(callback)
     {
         this.classNames = {"arts": ["Geography", "English", "Social Studies", "French", "Drawing"],
                            "sciences": ["Math", "Science", "API Trig", "Chemistry", "Physics"]};
        
         this.testData = [{type: "arts", userId: 3}, 
             {type: "sciences", userId: 2}, 
             {type: "sciences", userId: 1}]

        this.stepCounter = 0;
        this.mainObject = []; 
        this.stepCallBack = callback;
         
     }
     

     
    announceStepComplete(userId,message)
    {
        this.stepCounter ++;
       
        this.stepCallBack({state: 'STEP',message: message})
        if (this.stepCounter === this.testData.length)
        {
           this.stepCallBack({state: 'COMPLETE',message: JSON.stringify(this.mainObject)})
        }
        
    }
     
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    getSampleDelay(userId)
    {
        return this.getRandomInt(1500,3500) ;   
        
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
            

        }, this.getSampleDelay(userId))
    })

     //console.log("p is "+(typeof p))
     return p;
        
        
    }   
    
    
    doDemo()
    {
        
        this.stepCounter = 0;
        this.mainObject = []; 
        this.testData.forEach((current) => {
            this.getScores(current.type, current.userId, this.mainObject);
        })
    }
     
     
 }//en justatend class
 
 class SequentialDemo extends JustAtTheEndDemo
 {
     
    doDemo()
    {
        let me = this;
        this.testData.reduce((previous, current, index, array) => {
        return  previous                                    // initiates the promise chain
                .then(()=>{
                    return  this.getScores(current.type,current.userId,this.mainObject)
                })      //adds .then() promise for each item
        }, Promise.resolve()).then(() =>
            {
                this.stepCallBack({state: 'COMPLETE',message: JSON.stringify(this.mainObject)})
            })
    }
    getSampleDelay(userId)
    {
        return userId *500 ;   
        
    }
    
 }

///button code /////////////////////////////////////////
let stepElem = $('#stepList');
let infoElem = $('#infoBox');
let justAtEndButton = $('#justAtEnd')
let sequentialButton = $('#sequential')

function button_runJustAtTheEnd()
{
     
     let runAtEnd = new JustAtTheEndDemo(generalCallBack);
     setUp();
     runAtEnd.doDemo();
}

function button_sequential()
{
     
     let sequential = new SequentialDemo(generalCallBack);
     setUp();
     sequential.doDemo();
}


////////////////////////////////

function setUp()
{
    
     stepElem.empty();
     infoElem.empty();
     stepElem.append("<li>Starting...</li>")
     justAtEndButton.prop('disabled', true);
     sequentialButton.prop('disabled', true);   
}

/**
 * actions {state: string , payload: string}
 * state is one of STEP, COMPLETE 
 * 
 */
function generalCallBack(action)
{
    if (action.state === "STEP")
    {
       stepElem.append('<li>'+action.message+'</li>')
    }
    if (action.state === "COMPLETE")
    {
        infoElem.html(action.message);
        justAtEndButton.prop('disabled', false);
        sequentialButton.prop('disabled', false);    
    
    }
}