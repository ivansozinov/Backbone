
/*Created by User on 06.07.2016.*/

 /*function resetForms (){
    $('#user_form').trigger('reset');
 }
*/

 /*$(function(){
    $('#addNewField').click(function(){
        var tr = $('<tr></tr>'),
        userId = $('<td></td>').append($('#firstName').val()),
        fNameTD = $('<td></td>').append($('#firstName').val()),
        lNameTD = $('<td></td>').append($('#lastName').val()),
        ageTD = $('<td></td>').append($('#age').val()),
        countryTD=$('<td></td>').append($('#country').val()),
        deleteBtn = $('<a href="#">Delete</a>'),
        updateBtn = $ ('<a href="#">Edit</a>'),
        editTD=$('<td></td>').append(deleteBtn," ",updateBtn);
        tr.append(fNameTD)
        tr.append(lNameTD)
        tr.append(ageTD)  
        tr.append(countryTD)
        tr.append(editTD)
        tr.appendTo('tbody','contacts')
        deleteBtn.click(function(){tr.remove()})
    })*/


(function ($) {

    //demo data
    var contacts = [
        { userId: "1", userFname: "Ellen", userLname: "Ripley", userAge: 30,userCountry: 'Unknown',  edit: 'Edit Delete' },
        { userId: "2", userFname: "John", userLname: "Connor", userAge: 14, userCountry: "USA",  edit: 'Edit Delete' },
        { userId: "3", userFname: "Anakin", userLname: "Skywalker", userAge: 18, userCountry: "Intergalactic",  edit: 'Edit Delete'},
        
    ];

    //define product model
    var Contact = Backbone.Model.extend({
        defaults: {
           userId: 1,
            userFname: 'Danya',
            userLname:'Bagrov',
            userAge:'23',
            userCountry:'Russia'
        }
    });

    //define directory collection
    var Directory = Backbone.Collection.extend({
        model: Contact
    });

    var directory = new Directory(contacts);


    //define individual contact view
    var ContactView = Backbone.View.extend({
        tagName: "tr",
        className: "row",
        template: $("#userTemplate").html(),

        render: function () {
            var tmpl = _.template(this.template);
            
            $(this.el).html(tmpl(this.model.toJSON()));
            return this;
        },

        events: {
            "click button.delete": "deleteContact"
        },

        //delete a contact
        deleteContact: function () {
            

            //remove model
            this.model.destroy();

            //remove view from page
            this.remove();

            
            
        }

    });


 var AddContactView = Backbone.View.extend({
    el:"#user_form",
    tagName: "tr",
    className: ".row",
    template: $("#userTemplate").html(),

    events: {
        "submit": "addContact" // при событии формы запускать контакт 
    },

    addContact: function (e){
        e.preventDefault(); // отменяет действие по умолчанию
        
        var formData = {
            userId: this.$("#userId").val(),
            userFname: this.$("#userFname").val(),
            userLname:this.$("#userLname").val(),
            userAge:this.$("#userAge").val(),
            userCountry:this.$("#userCountry").val(),
            edit: "Edit Delete"

        };
            contacts.add(formData);
           console.log(contacts);

      
    }



    
});


    //define master view
    var DirectoryView = Backbone.View.extend({
        el: $("#contacts"),

        initialize: function () {

            console.log(this);

            var addContactView = new AddContactView({collection: Directory}).render();
            //this.collection = new Directory(contacts); //nuance
            this.render();
            //this.collection.on("add", this.renderContact, this);
            this.model.on("add remove", this.render());

        },

        render: function () {
            _.each(this.model, function (item) {
                this.renderContact(item);
            }, this);
        },

        renderContact: function (item) {
            var contactView = new ContactView({
                model: item
            });
            this.$el.append(contactView.render().el);
        },

    });

    //create instance of master view
;
console.log('directory', directory);
    var directory = new DirectoryView({
        model: directory
    }); //главное представление

} (jQuery));
