$(document).ready(function () {
    function init() {
        todaysDate();
        renderTimeBlocks();
        updateRowColor();
        showTask();
        //call local storage

    };

    function renderTimeBlocks() {
        for (let i = 9; i <= 21; i++) {
            $('.row').append(createTimeBlock(i));
        }
    };

    function createTimeBlock(time) {

        let div = $(`<div class="col-12">
        <div class="rowDetails time-block" data-time="${time}">
          <div class="col-md-1 hour">${time}</div>
          <textarea class="col-md-10 description"></textarea>
          <button class="col-md-1 saveBtn">
            <span class="fas fa-save"></span>
          </button>
        </div>
      </div>`)
        return div;
    };

    function todaysDate() {
        $("#currentDay").text(moment().format("MMMM Do YYYY"));
    }

    function updateRowColor() {
        let currentHour = moment().hour();
        $('.time-block').each(function () {
            let hour = $(this).attr('data-time');
            hour = parseInt(hour, 10);
            if (currentHour > hour) {
                $(this).addClass('past');
            };
            if (currentHour === hour) {
                $(this).addClass('present');
            };
            if (currentHour < hour) {
                $(this).addClass('future');
            }
        }
        )
    };

    init();
    $('.saveBtn').on('click', saveTask)

    function saveTask() {
        savedMessage()
        let timeData = $(this).parent().attr("data-time");
        let textValue = $(this).prev().val();
        localStorage.setItem(timeData, textValue);
    }

    function savedMessage() {
        $("#saved").show().delay(300).fadeOut();
    }



});