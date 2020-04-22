export default class ProcessData{
    constructor(content){
     this.content= content
    }
    get data(){
        return this.process()
    }
    space(string){
        let paragraph = string
        let array=[]
        let start=0
        while(true){
               let foundStart=paragraph.indexOf('\n',start)
               if(foundStart==-1 ) break;
               let code=paragraph.slice(start,foundStart)
               start=foundStart+'\n'.length
               array.push(code)
        }
        let t=JSON.stringify(array.filter(elem=>elem.length>1));
        console.log(t);
        return t;

     }
    process(){
        let paragraph = this.content
        let array=[]
        let start=0
        while(true){
               let foundStart=paragraph.indexOf('<code-->',start)
               let foundEnd=paragraph.indexOf('<--code>',start )
               if(!(foundStart<foundEnd) || foundStart==-1 ||foundEnd==-1) break;
               let code=paragraph.slice(foundStart,foundEnd).replace('<code-->','').replace('<--code>','')
               let startText=paragraph.slice(start,foundStart)
               start=foundEnd+'<code-->'.length
               array.push({text:this.space(startText),code:this.space(code)})
        }
        return JSON.stringify(array);

    }
}
try{
    window.myobj=ProcessData
}catch{

}
