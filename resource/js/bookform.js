﻿(function() {
    var GUEST = window.GUEST = {
        height:"",
        weight:"",
        foot:"",
        trans1:"",
        trans2:"",
        _transfer_form:{},
        _$transfer_detail:$("#transfer-detail"),
        _numInit:2,
        _count:1,
        _dateCount:1,
        _agreementChecked:0,
        _agreementCount:0,
        genType1TR :    function() {
            /* {{{ */
            // var num = (this._count)++;
            var num = "NUM";
            var strArr = [];
            strArr[strArr.length] = '<tr><td><input type="hidden" name="guest-NUM" value="--------------------------------------------------"><select size="1" name="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-gender"><option value="Male">MR.</option><option value="Female">MS.</option></select><input type="text" class="guest-name" name="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-name"></td><td><input size="1" class="width-1" type="text" name="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-age"></td><td><label for="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-active-snk">SNK</label><input type="checkbox" id="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-active-snk" name="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-active" value="SNK">/<label for="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-active-idv">IDV</label><input type="checkbox" id="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-active-idv" name="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-active" value="IDV"></td><td><label for="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-height">';
            strArr[strArr.length] = this.height;
            strArr[strArr.length] = '</label><input size="1" class="width-1" type="text" id="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-height" name="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-height">cm</td><td><label for="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-weight">';
            strArr[strArr.length] = this.weight;
            strArr[strArr.length] = '</label><input size="1" class="width-1" type="text" id="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-weight" name="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-weight">kg</td><td><label for="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-foot-size">';
            strArr[strArr.length] = this.foot;
            strArr[strArr.length] = '</label><input size="1" class="width-1" type="text" id="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-foot-size" name="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-foot-size">cm</td></tr>';
            return strArr.join('');
            /* }}} */
        },
        genType2TR :    function() {
            /* {{{ */
            // var num = (this._count)++;
            var num = "NUM";
            var strArr = [];
            strArr[strArr.length] = '<tr><td><input type="hidden" name="guest-NUM" value="--------------------------------------------------"><select size="1" name="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-gender"><option value="Male">MR.</option><option value="Female">MS.</option></select><input type="text" class="guest-name" name="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-name"></td><td><label>FDV</label><input type="checkbox" name="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-active" value="FDV">/<label>RD</label><input type="checkbox" name="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-active" value="RD"></td><td><input type="text" size="1" class="width-1" name="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-cert"></td><td><input type="text" class="width-1" size="1" name="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-total-dives"></td><td><input type="text" class="width-1" size="1" name="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-last-dive-month" value="MM">/<input type="text" size="2" class="width-2" name="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-last-dive-year" value="YYYY"></td><td><label>';
            strArr[strArr.length] = this.height;
            strArr[strArr.length] = '</label><input size="1" class="width-1" type="text" name="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-height">cm</td><td><label>';
            strArr[strArr.length] = this.weight;
            strArr[strArr.length] = '</label><input size="1" class="width-1" type="text" name="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-weight">kg</td><td><label>';
            strArr[strArr.length] = this.foot;
            strArr[strArr.length] = '</label><input size="1" class="width-1" type="text" name="guest-';
            strArr[strArr.length] = num;
            strArr[strArr.length] = '-foot-size">cm</td></tr>';
            return strArr.join('');
            /* }}} */
        },
        checkAgreements : function () {
            /* {{{ */
            var me = this;
            me._agreementChecked = 0;
            me._agreementCount   = 0;
            $(".agreements").each(function(){
                var me = GUEST;
                ++(me._agreementCount)
                if ($(this).is(":checked")) ++(me._agreementChecked);
            });
            if (me._agreementCount == me._agreementChecked) {
                $("input[type='submit']").prop('disabled',false);}
            else {
                $("input[type='submit']").prop('disabled',true);}
            /* }}} */
        },
        init :  function() {
            $(".date-of-trip").datepicker({"dateFormat":"d MM, yy"});
            var addNewType1 = $("#addNewType1");
            var addNewType2 = $("#addNewType2");
            var strArr = [];
            for (var i = 0; i < this._numInit; ++i) {
                strArr[strArr.length] = this.genType1TR();
            }
            addNewType1.before(strArr.join(''));
            strArr = [];
            for (var i = 0; i < this._numInit; ++i) {
                strArr[strArr.length] = this.genType2TR();
            }
            addNewType2.before(strArr.join(''));
            addNewType1.click(function (){
                $(this).before(GUEST.genType1TR());});
            addNewType2.click(function (){
                $(this).before(GUEST.genType2TR());});
            /*
            this._transfer_form["yes"] = this._$transfer_detail.html();
            this._transfer_form["no"] = '<h3>'+GUEST.trans1+'</h3><p>'+GUEST.trans2+'</p>';
            $("input[name='need-transfer']").click(function(){
                GUEST._$transfer_detail.html(GUEST._transfer_form[$(this).attr("value")]);
            });
            */
            $(".agreements").click(function(event){
                GUEST.checkAgreements();
            });

            this.checkAgreements();
            $("#open-rest").click(function(){
                /* {{{ */
                if(-1 === $("#email").val().indexOf("@")) return;
                else {
                    $("#rest").show();
                    $(this).remove();
                    $("#name").focus();
                }
                /* }}} */
            });
            $("form").submit(function(){
                /* {{{ */
                GUEST._count = 1;
                $(".guest-name").each(function(){
                    if(0 === $(this).val().length)
                        $(this).parent().parent().remove();
                    else {
                        $(this).parent().parent().find("input").each(function(){
                            var name = $(this).attr("name");
                            name = name.split("-");
                            name[1] = GUEST._count;
                            $(this).attr("name",name.join(" "));   
                        });
                        $(this).parent().parent().find("select").each(function(){
                            var name = $(this).attr("name");
                            name = name.split("-");
                            name[1] = GUEST._count;
                            $(this).attr("name",name.join(" "));   
                        });
                        ++(GUEST._count);
                    }
                });
                return true;
                /* }}} */
            });
            $("#add-another-day").click(function(){
                /* {{{ */
                var me = GUEST;
                var num = ++(me._dateCount);
                var strArr = [];
                strArr[strArr.length] = '<input type="text" class="date-of-trip" name="Date of Trip-';
                strArr[strArr.length] = num;
                strArr[strArr.length] = '">';
                var $html = $(strArr.join(''));
                var currentDate = $(".date-of-trip").last().datepicker("getDate");
                if (null != currentDate) {
                    currentDate.setDate(currentDate.getDate()+1);
                    $html.datepicker({"dateFormat":"d MM, yy"});
                    $html.datepicker("setDate",currentDate);
                } else {
                    $html.datepicker({"dateFormat":"d MM, yy"});
                }
                $(this).before($html);
                /* }}} */
            });
        }
    }
})();