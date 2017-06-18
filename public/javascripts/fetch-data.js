/**
 * Created by wang on 2017/6/18.
 */

function fetch_dockerfile_data(image_name){
    var bodyStr = "dockerImageName= "+image_name;
    var myInit = {
        method: 'POST',
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: bodyStr
    };

    window.fetch("/get_dockerfile_data",myInit).then(function(res){
        return res.json();
    }).then(function(json){
        $("#d_name").text(image_name);
        $("#dh_url").text(json["dockerhub_url"]);
        var df_content_p_Array = json["dockerfile_content"].split("\n");
        var df_content_html = "";
        var color = true;
        var i = 0;
        for(p_text in df_content_p_Array){
            i += 1;
            if(color) {
                df_content_html += "<pre class='p_gray' id='p_content'>" + i + "    " + df_content_p_Array[p_text] + "</pre>";
                color = false;
            } else{
                df_content_html += "<pre class='p_white' id='p_content'>" + i + "    " + df_content_p_Array[p_text] + " </pre>";
                color = true;
            }
        }
        $("#df_content").html(df_content_html);
    }).catch(function(ex) {
        alert('Get search response failed', ex);
    })
}

