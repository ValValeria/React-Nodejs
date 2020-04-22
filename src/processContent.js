export default class ProcessData{
    constructor(content){
     this.content= content
    }
    get data(){
        return this.process()
    }
    space(string){
        /**
         * Если передана стринга ,значит нет изображений
         * Если передан массив , значит [text,{img:src}],где текст будет разделен на массив
         */
        if(Array.isArray(string)){
            let result=[]
            string.forEach((elem)=>{
                if(typeof elem=='object'){
                    if('h1' in elem){
                        result.push([{h1:la(elem.h1)}])
                    }else result.push(la(elem))
                }else result.push(la(elem))
            })
            return result.filter(elem=>elem?true:false);

        }else{
           return  la(string)
        }
        function la(str){
         if(typeof str =="object") return [str]
         let paragraph=str.includes("\n") ?str.split('\n').filter(elem=>elem.length>0): [str]
         return paragraph;
        }
     }
    process(){
        let array=[]
        
        function* find(paragraph,startSearch,endSearch){
            let start=0
            while(true){
                let foundStart=paragraph.indexOf(startSearch,start)
                let foundEnd=paragraph.indexOf(endSearch,start )
                if(!(foundStart<foundEnd) || foundStart==-1 ||foundEnd==-1) {
                    if(paragraph.slice(start)){
                        yield {between:"",beforebet:paragraph.slice(start)}
                    }
                    break;
                }
                let between=paragraph.slice(foundStart,foundEnd).replace(startSearch,'').replace(endSearch,'')
                let beforebet=paragraph.slice(start,foundStart)
                start=foundEnd+endSearch.length
                console.log({between:between,beforebet:beforebet})
                yield {between:between,beforebet:beforebet}
            }            
        }

        for(let {between,beforebet} of find(this.content,"<code-->","<--code>")){//делим на код и текст
            console.log(between)
            console.log(beforebet)

            let images=[]
            for (let obj of find(beforebet,'<img->','<-img>')){/// в тексте находим картинки
                   for(let h1 of find(obj.beforebet,'<h1->','<-h1>')){
                     if(!h1.between){
                        images.push(h1.beforebet)
                     }else{
                         images.push(h1.beforebet)
                         images.push({h1:h1.between})
                     }
                   }
                   images.push({image:obj.between})
            }
            
            let queryText={text:this.space(images),code:this.space(between)}
            if(!queryText['text'])delete queryText['text']
            if(!queryText['code'])delete queryText['code']
            array.push(queryText)//если не нашли просто делим на строки

        }
        console.log(array)
        return JSON.stringify(array);
    }
}

try{
    window.obj=ProcessData
}catch{

}
