import React, { useEffect, useState } from 'react';
import './CreateArticle.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';




function CreateArticle() {

    const htmlcont = '<p>Lorem ipsum dolor sit amet, eu duo legere dissentias intellegebat, <strong>in everti facilis elaboraret pri</strong>. Ne mel duis soleat definitionem, erant quaeque deseruisse mel ut. Rebum fugit albucius ad has, has aperiam contentiones ad, et alienum prodesset persequeris usu. No atqui sapientem principes mea, vel enim unum illud cu. In semper suavitate forensibus ius.</p> <p>Duo ut putant melius repudiare. <strong>Ei vel voluptua elaboraret, pro dictas volumus interesset ut. Assum patrioque consequuntur no quo</strong>, ne usu tation nostro vidisse. Ne alii populo mel, pri an veri moderatius argumentum, sit odio omittam interesset at. Eius alterum deleniti id <a href="http://google.com" target="_blank">quo</a> , tale suas sed et, ad modus noluisse nam.</p> <p></p> <img src="https://i.imgur.com/guzeRPZ.jpg" alt="undefined" style="height: auto;width: auto"/> <p></p> <img src="https://lh3.googleusercontent.com/jtDC9Amk-FguKNxYUsE9Y5Wp9HK9wKx5FPG5snkG3yczpCziMuamZ5iNtb7X4Q0OC2XuzPG34MBqQwGhcCQG64bVuuQ7_O5yaxMpCIr8-aWIld5Dk8rkC214fVtxbZcR8F0wkRgG" alt="undefined" style="height: auto;width: auto"/> <p></p> <p>Te eum malis impetus, cu exerci mandamus assueverit his, ea mollis oporteat contentiones per. Ius perfecto laboramus te, liber hendrerit dissentiet ei eum. Et movet senserit cum. Ne aliquam partiendo torquatos eos, cum an error ullamcorper. Per ea tale graecis. Sed debitis facilisis efficiantur eu.</p> <p>Causae eligendi persecuti duo ne, vix quis movet albucius at, ut eum mundi ludus insolens. Nec quem ponderum et, reprimique neglegentur at mei. Eos cu splendide aliquando accommodare, eum atqui etiam tacimates ex. <strong>Has dicta eleifend ei, ius an salutatus corrumpit, et mollis vituperata intellegebat ius. Omnes audire et ius, legendos inimicus qui in, mei ei alia dicant persecuti.</strong></p> <p>Ea mea graece impetus. Te verear convenire nec, no commune insolens patrioque vix. Nec quem dicant commodo id, nam <strong>te diam inermis</strong>, et sed suas iusto. Vix te veri consequat, no mei augue homero munere.</p>'

    const [value, setValue] = useState(htmlcont);

    const modules =  {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      }
    
      //ver imageuploader handler: quill-image-uploader  https://codesandbox.io/s/react-quill-demo-forked-6zs7v3?file=/src/editor.js
      // el innerHtml esta limpio y accesible tro del div del quill editor

    return (
        <main>
            <h1>Aca va el editor!!!</h1>
            <div>
            <ReactQuill id="editquill" theme="snow" modules={modules} value={value} onChange={setValue}/>
            </div>
        </main>
    )

}

export default CreateArticle;