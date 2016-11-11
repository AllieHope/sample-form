//Carousel options
$('.carousel').carousel({
  interval: 5000
});

//Initially load slideshow images
setTimeout(getNewImage, 3000);

//Load subsequent images for slideshow after each new slide
$(".carousel").on('slid.bs.carousel', function(){
    getNewImage();
});

function getNewImage(){
    var image;
    $.get("https://source.unsplash.com/category/nature/900x500", function(data, status){
        if(status === 'success'){
            image = 'https://source.unsplash.com/category/nature/900x500';
            $(".carousel-item.active > img").addClass('changed');
            $(".carousel-item:not(.active) > img:not(.changed)").attr('src', image);
        }
    });
    //Stop performing get requests once all images have been loaded
    if($(".carousel-item > img:not(.changed)").length === 0){
        $(".carousel").off();
    }
}

function pauseCarousel(){
    $('.carousel').carousel('pause');
    $("#pauseButton").css({"display":"none", "visibility":"hidden"});
    $("#resumeButton").css({"display":"block", "visibility":"visible"});
}

function resumeCarousel(){
    $('.carousel').carousel('cycle');
    $("#resumeButton").css({"display":"none", "visibility":"hidden"});
    $("#pauseButton").css({"display":"block", "visibility":"visible"});
}

//Helper functions to validate the form
function validateEmail(){
    var email = $("#email").val();
    var pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return pattern.test(email);
}

function validateRequiredFields(formId){
    var requiredFields = true;
    $("#"+formId+" input").each(function(){
        if((this.hasAttribute('required') === true) && (this.value === "")){
            requiredFields = false;
        }
    });
    return requiredFields;
}

function validateURL(){
    var url = $("#website").val();
    var pattern = /^(https?\:\/\/)([a-zA-Z]|[0-9]|\/)+(\.[a-zA-Z]*)+\/?(\?|\#|\&|\=|\$|\-|\_|\.|\+|\!|\*|\'|\(|\)|\,|[a-zA-Z]|[0-9])*$/g;
    return pattern.test(url);
}

//Function that is run on form submission which runs all helper validation functions
function validateForm(){
    var formId = 'testForm'
    var requiredFields = validateRequiredFields(formId);
    var validEmail = validateEmail();
    var validURL = validateURL();
    
    try{
        if(!requiredFields) throw "Please fill in all required fields";
        if(!validEmail) throw "Please enter a valid email";
        if(!validURL) throw "Please enter a valid URL including protocol \(http://\)";
        if(requiredFields && validEmail && validURL) throw "Form sucessfully completed!";
    }
    catch(err){
        alert(err);
    }
}

