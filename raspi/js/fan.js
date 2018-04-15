var eleBack_1 = null,
    eleBack_2 = null,
    eleBack_3 = null,
    eleFront_1 = null,
    eleFront_2 = null,
    eleFront_3 = null,
    eleList_1 = $(".list_1"),
    eleList_2 = $(".list_2"),
    eleList_3 = $(".list_3");

// box_1
var funBackOrFront_1 = function() {
    eleList_1.each(function() {
        if ($(this).hasClass("out")) {
            eleBack_1 = $(this);
        } else {
            eleFront_1 = $(this);
        }
    });
};
funBackOrFront_1();
$("#box_1").bind("click", function() {
    eleFront_1.addClass("out").removeClass("in");
    setTimeout(function() {
        eleBack_1.addClass("in").removeClass("out");
        funBackOrFront_1();
    }, 225);
    return false;
});

// box_2
var funBackOrFront_2 = function() {
    eleList_2.each(function() {
        if ($(this).hasClass("out")) {
            eleBack_2 = $(this);
        } else {
            eleFront_2 = $(this);
        }
    });
};
funBackOrFront_2();
$("#box_2").bind("click", function() {
    eleFront_2.addClass("out").removeClass("in");
    setTimeout(function() {
        eleBack_2.addClass("in").removeClass("out");
        funBackOrFront_2();
    }, 225);
    return false;
});

// box_3
var funBackOrFront_3 = function() {
    eleList_3.each(function() {
        if ($(this).hasClass("out")) {
            eleBack_3 = $(this);
        } else {
            eleFront_3 = $(this);
        }
    });
};
funBackOrFront_3();
$("#box_3").bind("click", function() {
    eleFront_3.addClass("out").removeClass("in");
    setTimeout(function() {
        eleBack_3.addClass("in").removeClass("out");
        funBackOrFront_3();
    }, 225);
    return false;
});


//标题渐变
var titletext = [
    "您好，今天心情好吗?",
    "希望您一天都有好心情!",
    "莫愁前路无知己,天下谁人不识君",
    "桃花潭水三千尺,不及汪伦送我情",
    "孤帆远影碧空尽,唯见长江天际流",
    "云想衣裳，花想容",
    "此夜曲中闻折柳，何人不起故国情",
    "举杯邀明月，对影成三人",
    "仰天大笑出门去，我辈岂是蓬蒿人",
    "人攀明月不可得，月行却与人相随",
    "抽刀断水水更流，举杯销愁愁更愁",
    "山有木兮木有枝，心悦君兮君不知",
    "人生若只如初见，何事秋风悲画扇",
    "曾经沧海难为水，除却巫山不是云",
    "玲珑骰子安红豆，入骨相思知不知",
    "只愿君心似我心，定不负相思意",
    "入我相思门，知我相思苦",
    "去年今日此门中，人面桃花相映红"
];

var i = 0;


var settitles = setInterval(function() {
    // console.log(i);
    $("#title").text(titletext[i]);
    $("#title").hide();
    $("#title").fadeIn("slow");
    i++;
    if (i > 1) {
        clearInterval(settitles);
        return;
    }

}, 2400);

//生成随机数
function RandomNumBoth(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
}

var numb = 0,
    numl = 0;

$("#title").bind("click", function() {
    //上下句防重复
    while (numb == numl) {
        numl = RandomNumBoth(2, titletext.length - 1);
    }
    numb = numl;
    $("#title").text(titletext[numl]);
    $("#title").hide();
    $("#title").fadeIn("slow");
});

//读取文件（txt，jpg）
function jsReadFiles(files) {
    if (files.length) {
        var file = files[0];
        var reader = new FileReader(); //new一个FileReader实例
        if (/text+/.test(file.type)) { //判断文件类型，是不是text类型
            reader.onload = function() {
                // $('#b1_b').append('<pre>' + this.result + '</pre>');
                $('#b1_b_text').html('<pre>' + this.result + '</pre>');
            }
            reader.readAsText(file);
        } else if (/image+/.test(file.type)) { //判断文件是不是imgage类型
            reader.onload = function() {
                $('#b1_b').append('<img src="' + this.result + '"/>');
            }
            reader.readAsDataURL(file);
        }
    }
}

//读取文件 转 二维数组（cvs）
function csv(){
    $("input[name=csvfile]").csv2arr(function(arr){
        console.log( arr );
        //组装html代码
        var tblStr = "<table border='1' align='center'>";
        $.each( arr, function(i, line){
            tblStr += "<tr>";
            $.each( line, function(i, cell){
                tblStr += "<td>"+cell+"</td>";
            });
            tblStr += "</tr>";
        });
        $("#b1_b_text").html( tblStr );
    });
}

//box_1内容
// $(function() {
//     for (var i = 1; i < 9; i++) {
//         $("#b1_b").append("<li><var>" + i + "</var><a href='#'>实例文字</a></li>");
//     }
// });


//box_2内容
$(function() {
    for (var i = 1; i < 9; i++) {
        $("#b2_b").append("<li><var>" + i + "</var><a href='#'>实例文字</a></li>");
    }
});

//box_3内容
$(function() {
    for (var i = 1; i < 9; i++) {
        $("#b3_b").append("<li><var>" + i + "</var><a href='#'>实例文字</a></li>");
    }
});