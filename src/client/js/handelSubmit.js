import {checkForURL} from './checkURL'

    function handelSubmit(e) {
    e.preventDefault()
    let URL =document.getElementById('article-url').value;

    if(checkForURL(URL)){

        console.log("::: Form Submitted :::")
        //fetch('http://localhost:8082/test')
        Data(URL)
        .then(res => {
            //return res.json()
            console.log("Data in clint",res.sentence_list[0].text)
            document.getElementById('text').innerHTML="text: " + res.sentence_list[0].text;
            document.getElementById('agreement').innerHTML="Agreement: " +res.sentence_list[0].agreement;
            document.getElementById('subjectivity').innerHTML="Subjectivity: "  +res.subjectivity;
            document.getElementById('confidence').innerHTML="Confidence: " +res.confidence;
            document.getElementById('irony').innerHTML="Irony: " +res.irony;
            document.getElementById('score_tag').innerHTML="Score Tag: " +res.score_tag;

        })
    }

    }

    const Data = async(url = '') => {

        const response = await fetch('http://localhost:8084/api', {method: 'POST',credentials: 'same-origin',mode: 'cors',
            headers: {'Content-Type': 'application/json',}, body: JSON.stringify({ "url": url }),     
        });
    
        try {
            const newData = await response.json();
            console.log(newData)
            return newData //return data in json format
        } catch (error) {
            console.log("error", error);
            alert("error: ",error);
        }
    }
    
    export { handelSubmit }