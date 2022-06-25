import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './Tinymcenew.css'  ;

export default function Tinymcenew() {
  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };




  const htmlcont = '<p>Lorem ipsum dolor sit amet, eu duo legere dissentias intellegebat, <strong>in everti facilis elaboraret pri</strong>. Ne mel duis soleat definitionem, erant quaeque deseruisse mel ut. Rebum fugit albucius ad has, has aperiam contentiones ad, et alienum prodesset persequeris usu. No atqui sapientem principes mea, vel enim unum illud cu. In semper suavitate forensibus ius.</p> <p>Duo ut putant melius repudiare. <strong>Ei vel voluptua elaboraret, pro dictas volumus interesset ut. Assum patrioque consequuntur no quo</strong>, ne usu tation nostro vidisse. Ne alii populo mel, pri an veri moderatius argumentum, sit odio omittam interesset at. Eius alterum deleniti id <a href="http://google.com" target="_blank">quo</a> , tale suas sed et, ad modus noluisse nam.</p> <p></p> <img src="https://i.imgur.com/guzeRPZ.jpg" alt="undefined" style="height: auto;width: auto"/> <p></p> <img src="https://lh3.googleusercontent.com/jtDC9Amk-FguKNxYUsE9Y5Wp9HK9wKx5FPG5snkG3yczpCziMuamZ5iNtb7X4Q0OC2XuzPG34MBqQwGhcCQG64bVuuQ7_O5yaxMpCIr8-aWIld5Dk8rkC214fVtxbZcR8F0wkRgG" alt="undefined" style="height: auto;width: auto"/> <p></p> <p>Te eum malis impetus, cu exerci mandamus assueverit his, ea mollis oporteat contentiones per. Ius perfecto laboramus te, liber hendrerit dissentiet ei eum. Et movet senserit cum. Ne aliquam partiendo torquatos eos, cum an error ullamcorper. Per ea tale graecis. Sed debitis facilisis efficiantur eu.</p> <p>Causae eligendi persecuti duo ne, vix quis movet albucius at, ut eum mundi ludus insolens. Nec quem ponderum et, reprimique neglegentur at mei. Eos cu splendide aliquando accommodare, eum atqui etiam tacimates ex. <strong>Has dicta eleifend ei, ius an salutatus corrumpit, et mollis vituperata intellegebat ius. Omnes audire et ius, legendos inimicus qui in, mei ei alia dicant persecuti.</strong></p> <p>Ea mea graece impetus. Te verear convenire nec, no commune insolens patrioque vix. Nec quem dicant commodo id, nam <strong>te diam inermis</strong>, et sed suas iusto. Vix te veri consequat, no mei augue homero munere.</p>'

  return (
    <>
      <div className="tinymceEditor">
        <Editor
          tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
          onInit={(evt, editor) => editorRef.current = editor}
          

          init={{
            selector: 'textarea#file-picker',
            plugins: 'image code',
            toolbar: 'undo redo | link image | code',
            /* enable title field in the Image dialog*/
            image_title: true,
            /* enable automatic uploads of images represented by blob or data URIs*/
            automatic_uploads: true,
            /*
              URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
              images_upload_url: 'postAcceptor.php',
              here we add custom filepicker only to Image dialog
            */
            file_picker_types: 'image',
            /* and here's our custom image picker*/
            file_picker_callback: function (cb, value, meta) {
              var input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');
          
              /*
                Note: In modern browsers input[type="file"] is functional without
                even adding it to the DOM, but that might not be the case in some older
                or quirky browsers like IE, so you might want to add it to the DOM
                just in case, and visually hide it. And do not forget do remove it
                once you do not need it anymore.
              */
          
              input.onchange = function () {
                var file = this.files[0];
          
                var reader = new FileReader();
                reader.onload = function () {
                  /*
                    Note: Now we need to register the blob in TinyMCEs image blob
                    registry. In the next release this part hopefully won't be
                    necessary, as we are looking to handle it internally.
                  */
                  var id = 'blobid' + (new Date()).getTime();
                  var blobCache =  window.tinymce.activeEditor.editorUpload.blobCache;
                  var base64 = reader.result.split(',')[1];
                  var blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);
          
                  /* call the callback and populate the Title field with the file name */
                  cb(blobInfo.blobUri(), { title: file.name });
                };
                reader.readAsDataURL(file);
              };
          
              input.click();
            },
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
          onEditorChange={log}
        />
      </div>
    </>
  );
}
