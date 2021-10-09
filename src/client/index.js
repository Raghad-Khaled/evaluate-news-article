
// TODO: include your scss file here
import {handelSubmit} from './js/handelSubmit'
import './styles/resets.scss'
import './styles/base.scss'
import './styles/form.scss'
import './styles/footer.scss'
import './styles/header.scss'

console.log('hhhhhclient....')

document.getElementById("submit").addEventListener('click',handelSubmit)




document.getElementById('article-url').addEventListener('change',function(){
    if(document.getElementById('article-url').value===''){
        document.getElementById("submit").disabled=true
    }else{
        document.getElementById("submit").disabled=false
    }  
})

