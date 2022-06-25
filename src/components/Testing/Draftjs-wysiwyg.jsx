import React, { useEffect, useState } from 'react';
import './CreateArticle.css';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';




function Editortexto() {

    const htmlcont = '<p>Lorem ipsum dolor sit amet, eu duo legere dissentias intellegebat, <strong>in everti facilis elaboraret pri</strong>. Ne mel duis soleat definitionem, erant quaeque deseruisse mel ut. Rebum fugit albucius ad has, has aperiam contentiones ad, et alienum prodesset persequeris usu. No atqui sapientem principes mea, vel enim unum illud cu. In semper suavitate forensibus ius.</p> <p>Duo ut putant melius repudiare. <strong>Ei vel voluptua elaboraret, pro dictas volumus interesset ut. Assum patrioque consequuntur no quo</strong>, ne usu tation nostro vidisse. Ne alii populo mel, pri an veri moderatius argumentum, sit odio omittam interesset at. Eius alterum deleniti id <a href="http://google.com" target="_blank">quo</a> , tale suas sed et, ad modus noluisse nam.</p> <p></p> <img src="https://i.imgur.com/guzeRPZ.jpg" alt="undefined" style="height: auto;width: auto"/> <p></p> <img src="https://lh3.googleusercontent.com/jtDC9Amk-FguKNxYUsE9Y5Wp9HK9wKx5FPG5snkG3yczpCziMuamZ5iNtb7X4Q0OC2XuzPG34MBqQwGhcCQG64bVuuQ7_O5yaxMpCIr8-aWIld5Dk8rkC214fVtxbZcR8F0wkRgG" alt="undefined" style="height: auto;width: auto"/> <p></p> <p>Te eum malis impetus, cu exerci mandamus assueverit his, ea mollis oporteat contentiones per. Ius perfecto laboramus te, liber hendrerit dissentiet ei eum. Et movet senserit cum. Ne aliquam partiendo torquatos eos, cum an error ullamcorper. Per ea tale graecis. Sed debitis facilisis efficiantur eu.</p> <p>Causae eligendi persecuti duo ne, vix quis movet albucius at, ut eum mundi ludus insolens. Nec quem ponderum et, reprimique neglegentur at mei. Eos cu splendide aliquando accommodare, eum atqui etiam tacimates ex. <strong>Has dicta eleifend ei, ius an salutatus corrumpit, et mollis vituperata intellegebat ius. Omnes audire et ius, legendos inimicus qui in, mei ei alia dicant persecuti.</strong></p> <p>Ea mea graece impetus. Te verear convenire nec, no commune insolens patrioque vix. Nec quem dicant commodo id, nam <strong>te diam inermis</strong>, et sed suas iusto. Vix te veri consequat, no mei augue homero munere.</p>'

    //tomar el innerHtml y covnertirlo a draft/////////////////////
    const blocksFromHTML = convertFromHTML(htmlcont);

    const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
    );
    ///////////////////////////////////////////////////////////////


    //Setear contenido inicial del Editor ///////////////////////
    const [editorState, setEditorState] = useState(EditorState.createWithContent(state));
    ///////////////////////////////////////////////////////////////

    //Actualizar el estado del editor ////////////////////////////
    const editorListener = (editorState) => {
        setEditorState(editorState);
    }
    ///////////////////////////////////////////////////////////////
   

    //toma el "estado del editor" y lo convierte a html ////////////
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    ///////////////////////////////////////////////////////////////

    return (
        <main>
            <h1>Aca va el editor!!!</h1>
            <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            localization={{
                locale: 'es',
              }}
              toolbar={{
                inline: { inDropdown: false },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true,
                    defaultTargetOption: '_blank',
                 },
                history: { inDropdown: true },
                image: {
                    className: undefined,
                    component: undefined,
                    popupClassName: undefined,
                    urlEnabled: true,
                    uploadEnabled: true,
                    alignmentEnabled: true,
                    uploadCallback: undefined,
                    previewImage: false,
                    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg,image/webp',
                    alt: { present: false, mandatory: false },
                    defaultSize: {
                      height: 'auto',
                      width: '100%',
                    },
                  },
                  embedded: {
                    className: undefined,
                    component: undefined,
                    popupClassName: undefined,
                    embedCallback: undefined,
                    defaultSize: {
                      height: 'auto',
                      width: '100%',
                    },
                },
              }}
            onEditorStateChange={editorListener}
            />
        </main>
    )

}

export default Editortexto;