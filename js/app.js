'use strict';

//Array of Photo objects
let allPhotos = [];
let optionsArr = ['narwhal', 'narwhal', 'triceratops', 'rhino', 'mouflon', 'lizard', 'dragon', 'unicorn', 'markhor', 'chameleon', 'narwhal', 'narwhal', 'triceratops', 'rhino', 'mouflon', 'lizard', 'dragon', 'unicorn', 'markhor', 'chameleon'];

//Constructor
function Photo(photoObj) {
    this.image_url = photoObj.image_url;
    this.title = photoObj.title;
    this.description = photoObj.description;
    this.keyword = photoObj.keyword;
    this.horns = photoObj.horns;
    allPhotos.push(this);
}

//Prototype to render the images and their title and description
Photo.prototype.render = function () {
    // let templete = $('#photo-template').clone();
    // templete.find('h2').text(this.title);
    // templete.find('img').attr('src', this.image_url);
    // templete.find('p').text(this.description);
    // templete.remove('photo-template');
    // $('#photo-template').first().remove();
    let template = $('#templateMain').html();
    let sectionMain = Mustache.render(template, this);
    $('main').append(sectionMain);

}


//Array to store the selected photos from select
var selectedPhotosArr = [];

//Function to add options to the 'select' element from the selectedPhotosArr array
function selectPhoto() {
    selectedPhotosArr.forEach(element => {
        let option = $(`<option value="${element}"> ${element}</option>`);
        console.log(option);
        $('select').append(option);
    });
}


$('select').click(function () {

    let selected = $(this).val();

    //As long as the value of the option selected is not default
    if (selected !== 'default') {
        let container = $('#photo-template');

        $('main').empty();
        $('main').append(container);

        allPhotos.forEach(function (value) {
            if (value.keyword === selected) {
                value.render();
            }
        });
    }
});

$('#pageOne').click(() => {
    $('select').html('');
    allPhotos = [];
    selectedPhotosArr = [];
    $('select').append(`<option value="default">Filter by Keyword</option>`);
    $('section').remove();

    //To get the data from the JSON file
    $.ajax('./data/page-1.json')
        .then(data => {
            console.log(data); // array of objects
            data.forEach((value) => {
                //Create a new object of type Photo
                let newPhoto = new Photo(value);
                newPhoto.render();

                //Check if the selected photo is in the array or not
                if (!selectedPhotosArr.includes(value.keyword)) {
                    selectedPhotosArr.push(value.keyword);
                }

            });
            selectPhoto();
        });

});

$('#pageTwo').click(() => {
    $('select').html('');
    allPhotos = [];
    selectedPhotosArr = [];

    $('select').append(`<option value="default">Filter by Keyword</option>`);
    $('section').remove();

    $.ajax('./data/page-2.json')
        .then(data => {
            console.log(data); // array of objects
            data.forEach((value) => {
                //Create a new object of type Photo
                let newPhoto = new Photo(value);
                newPhoto.render();

                //Check if the selected photo is in the array or not
                if (!selectedPhotosArr.includes(value.keyword)) {
                    selectedPhotosArr.push(value.keyword);
                }

            });
            selectPhoto();
        });

});

$('#sortHorn').click(function () {
    $('main').html('');
    sortHorns();
    allPhotos.forEach(element => {
        element.render();
    });
});

$('#sortTitle').click(function () {
    $('main').html('');
    sortTitle();

    allPhotos.forEach(element => {
        element.render();
    });
});

function sortTitle() {
    allPhotos.sort((a, b) => {
        if (a.title.toUpperCase() > b.title.toUpperCase()) {
            return 1;
        } else if (a.title.toUpperCase() < b.title.toUpperCase()) {
            return -1;
        } else {
            return 0;
        }
    });

}

function sortHorns() {
    allPhotos.sort((a, b) => {
        if (a.horns > b.horns) {
            return 1;
        } else if (a.horns < b.horns) {
            return -1;
        } else {
            return 0;
        }
    });

}  