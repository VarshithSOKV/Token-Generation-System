function aggregate_location(loc_array,location,name1,name2,name3,row,i,name_column) {    //function which seperates the sheet data into corresponding arrays
    if(row[5] == location){
            if(row[name_column] == name1){
              loc_array[0].push(i);
            }
            else if(row[name_column] == name2){
              loc_array[1].push(i);
            }
            else if(row[name_column] == name3){
              loc_array[2].push(i);
            }
          }
  }

function aggregate_gender(loc_array,location,name1,name2,name3,row,i,name_column) {    //function which seperates the sheet data into corresponding arrays
    if(row[5] == location){
          if(row[name_column] == name1){
            if(row[4] == "Male"){
              loc_array[0][0].push(i);
            }
            else if(row[4] == "Female"){
              loc_array[0][1].push(i);
            }
            else{
              loc_array[0][2].push(i);
            }
          }
          else if(row[name_column] == name2){
            if(row[4] == "Male"){
              loc_array[1][0].push(i);
            }
            else if(row[4] == "Female"){
              loc_array[1][1].push(i);
            }
            else{
              loc_array[1][2].push(i);
            }
          }
          else if(row[name_column] == name3){
            if(row[4] == "Male"){
              loc_array[2][0].push(i);
            }
            else if(row[4] == "Female"){
              loc_array[2][1].push(i);
            }
            else{
              loc_array[2][2].push(i);
            }
          }
        }
}

function de_duplicator_location(loc_array, data, name_column) {    // Removes the one who has filled the form a second time at given branch
  for (var h = 0; h < 3; h++){
    i1 = loc_array[h].length;
    for (var i = 1; i < i1; i++){            
      var flag = 0;
      for ( var k = 0; k < i; k++){
        flag = 0;
        for (var j = 1; j < 6 ; j++){
          if( data[loc_array[h][k]][j] == data[loc_array[h][i]][j]){
            flag = flag + 1;
          }
        }

          if( data[loc_array[h][k]][name_column] == data[loc_array[h][i]][name_column]){
            flag = flag + 1;
          }
        if(flag == 6){
          break;
        }
        }
  
      if(flag == 6){                         // Removes the repeated entry. So 2nd mail will not be sent.
        loc_array[h].splice(i,1);
        i1--;
        i--;
      }
     }
  }
}

function de_duplicator_gender(loc_array, data, name_column) {    // Removes the one who has filled the form a second time at given branch
  for (var h = 0; h < 3; h++){
    for (var g = 0; g < 3; g++){
        i1 = loc_array[h][g].length;
        for (var i = 1; i < i1; i++){            
          var flag = 0;
          for ( var k = 0; k < i; k++){
            flag = 0;
            for (var j = 1; j < 6 ; j++){
              if( data[loc_array[h][g][k]][j] == data[loc_array[h][g][i]][j]){
                flag = flag + 1;
              }
            }

              if( data[loc_array[h][g][k]][name_column] == data[loc_array[h][g][i]][name_column]){
                flag = flag + 1;
              }
            if(flag == 6){
              break;
            }
            }
      
          if(flag == 6){                         // Removes the repeated entry. So 2nd mail will not be sent.
            loc_array[h].splice(i,1);
            i1--;
            i--;
        }
      }
    }
  }
}

function email_sender_location(loc_array, loc_names, data, subject1, subject2) {
  for (var h = 0 ; h < 3 ; h++){
    i1 = loc_array[h].length;
     for (var i = 0; i < i1; i++){    // Sending mail for appointments at Given branch
      var time;
      var token;
      var subject;
      var message;
      var row = data[loc_array[h][i]];
      var name = row[2];
      var emailaddress = row[3];
  
      if( i == 0 ){
        subject = subject1;
        token = 1;
        time = "10:00 am";
      }
      else if( i == 1 ){
        subject = subject1;
        token = 2;
        time = "10:30 am";
      }
      else if( i == 2 ){
        subject = subject1;
        token = 3;
        time = "11:00 am";
      }
      else if( i == 3 ){
        subject = subject1;
        token = 4;
        time = "11:30 am";
      }
      else if( i == 4 ){
        subject = subject1;
        token = 5;
        time = "12:00 am";
      }
      else if( i == 5 ){
        subject = subject1;
        token = 6;
        time = "12:30 am";
      }
      else if ( i > 5){
        token = "-";
        subject = subject2;
        time = "Not Available"
      }
  
      if( i < 6){
        var text1 = "Your request for an appointment for Varshith Hospital, "+ loc_names[0] +" is successful. Your token and time details are given below.";
        var text2 = "Make sure to be at least 10 minutes prior the appointment time.\n\nSome important instructions are mentioned below : \n 1) Please ensure that you wear your mask.\n 2) Bring any previous related reports or prescriptions. \n 3) Maintain social distance \n 4) Donot forget you are in hospital and you are requested to maintain dignity.\n\nThankyou";
        message = "Dear " + name + ",\n\n" + text1 + "\n\n" + "Doctor : " + loc_names[h+1] + "\n\n" + "Token no : " + token + "\n" + "Time slot : " + time + "\n\n" + text2;
      }else{
        var text1 = "Your request for an appointment for Varshith Hospital, "+ loc_names[0] +" is not successful. Your token and time details are given below.";
        var text2 = "Please try again. Sorry for the inconvenience.\nThankyou.";
        message = "Dear " + name + ",\n\n" + text1 + "\n\n" + "Doctor : " + loc_names[h+1] + "\n\n" + "Token no : " + token + "\n" + "Time slot : " + time + "\n\n" + text2;
      }
  
      MailApp.sendEmail(emailaddress, subject, message);
     }
  }
}

function email_sender_gender(loc_array, loc_names, data, subject1, subject2){       // gives first 3 tokens for men, next 2 for women, last for other
  for (var h = 0; h < 3; h++){                                                     // A problem with this is if 4 men and 1 woman, it gives 3 men,1 woman,2 empty
    for (var g = 0; g < 3; g++){
    i1 = loc_array[h][g].length;
     for (var i = 0; i < i1; i++){    // Sending mail for appointments at Given branch
      var time;
      var token;
      var subject;
      var message;
      var row = data[loc_array[h][g][i]];
      var name = row[2];
      var emailaddress = row[3];
  
      if( g == 0){
        if( i == 0 ){
          subject = subject1;
          token = 1;
          time = "10:00 am";
        }
        else if( i == 1 ){
          subject = subject1;
          token = 2;
          time = "10:30 am";
        }
        else if( i == 2 ){
          subject = subject1;
          token = 3;
          time = "11:00 am";
        }
        else if ( i > 2){
          token = "-";
          subject = subject2;
          time = "Not Available"
        }
  
        if( i < 2){
          var text1 = "Your request for an appointment for Varshith Hospital, "+ loc_names[0] +" is successful. Your token and time details are given below.";
          var text2 = "Make sure to be at least 10 minutes prior the appointment time.\n\nSome important instructions are mentioned below : \n 1) Please ensure that you wear your mask.\n 2) Bring any previous related reports or prescriptions. \n 3) Maintain social distance \n 4) Donot forget you are in hospital and you are requested to maintain dignity.\n\nThankyou";
          message = "Dear " + name + ",\n\n" + text1 + "\n\n" + "Doctor : " + loc_names[h+1] + "\n\n" + "Token no : " + token + "\n" + "Time slot : " + time + "\n\n" + text2;
        }else{
          var text1 = "Your request for an appointment for Varshith Hospital, "+ loc_names[0] +" is not successful. Your token and time details are given below.";
          var text2 = "Please try again. Sorry for the inconvenience.\nThankyou.";
          message = "Dear " + name + ",\n\n" + text1 + "\n\n" + "Doctor : " + loc_names[h+1] + "\n\n" + "Token no : " + token + "\n" + "Time slot : " + time + "\n\n" + text2;
        }

        MailApp.sendEmail(emailaddress, subject, message);
      }

      else if ( g == 1){
        if( i == 0 ){
          subject = subject1;
          token = 4;
          time = "11:30 am";
        }
        else if( i == 1 ){
          subject = subject1;
          token = 4;
          time = "12:00 am";
        }
        else if ( i > 1){
          token = "-";
          subject = subject2;
          time = "Not Available"
        }
  
        if( i < 2){
          var text1 = "Your request for an appointment for Varshith Hospital, "+ loc_names[0] +" is successful. Your token and time details are given below.";
          var text2 = "Make sure to be at least 10 minutes prior the appointment time.\n\nSome important instructions are mentioned below : \n 1) Please ensure that you wear your mask.\n 2) Bring any previous related reports or prescriptions. \n 3) Maintain social distance \n 4) Donot forget you are in hospital and you are requested to maintain dignity.\n\nThankyou";
          message = "Dear " + name + ",\n\n" + text1 + "\n\n" + "Doctor : " + loc_names[h+1] + "\n\n" + "Token no : " + token + "\n" + "Time slot : " + time + "\n\n" + text2;
        }else{
          var text1 = "Your request for an appointment for Varshith Hospital, "+ loc_names[0] +" is not successful. Your token and time details are given below.";
          var text2 = "Please try again. Sorry for the inconvenience.\nThankyou.";
          message = "Dear " + name + ",\n\n" + text1 + "\n\n" + "Doctor : " + loc_names[h+1] + "\n\n" + "Token no : " + token + "\n" + "Time slot : " + time + "\n\n" + text2;
        }

        MailApp.sendEmail(emailaddress, subject, message);
      }

      else if ( g == 2){
        if( i == 0 ){
          subject = subject1;
          token = 5;
          time = "12:30 am";
        }
        else if ( i > 0){
          token = "-";
          subject = subject2;
          time = "Not Available"
        }
  
        if( i < 1){
          var text1 = "Your request for an appointment for Varshith Hospital, "+ loc_names[0] +" is successful. Your token and time details are given below.";
          var text2 = "Make sure to be at least 10 minutes prior the appointment time.\n\nSome important instructions are mentioned below : \n 1) Please ensure that you wear your mask.\n 2) Bring any previous related reports or prescriptions. \n 3) Maintain social distance \n 4) Donot forget you are in hospital and you are requested to maintain dignity.\n\nThankyou";
          message = "Dear " + name + ",\n\n" + text1 + "\n\n" + "Doctor : " + loc_names[h+1] + "\n\n" + "Token no : " + token + "\n" + "Time slot : " + time + "\n\n" + text2;
        }else{
          var text1 = "Your request for an appointment for Varshith Hospital, "+ loc_names[0] +" is not successful. Your token and time details are given below.";
          var text2 = "Please try again. Sorry for the inconvenience.\nThankyou.";
          message = "Dear " + name + ",\n\n" + text1 + "\n\n" + "Doctor : " + loc_names[h+1] + "\n\n" + "Token no : " + token + "\n" + "Time slot : " + time + "\n\n" + text2;
        }

        MailApp.sendEmail(emailaddress, subject, message);
      }
     }
    }
  }
}

function token_list_location(loc_array, cell_start, data){                              // Writes the appointment list in 'Slots' sheet
  var spreadSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Slots");
  for (var j = 0; j < 3; j++){
    for (var i = 0; i < loc_array[j].length && i < 6; i++){
      var name = data[loc_array[j][i]][2];
      var detail = data[loc_array[j][i]][11];
      var cell = spreadSheet.getRange(cell_start[j][0] + i, cell_start[j][1]);
      cell.setValue(name);
      cell = spreadSheet.getRange(cell_start[j][0] + i, cell_start[j][1]+1);
      cell.setValue(detail);
  }
  }
}

function token_list_gender(loc_array, cell_start, data){                              // Writes the appointment list in 'Slots' sheet
  var spreadSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Slots");
  for (var j = 0; j < 3; j++){
    for (var k = 0; k < 3; k++){
      for (var i = 0; i < loc_array[j][k].length; i++){
        var flag = 0;
        if(k == 0){
          if( i < 3 ){ flag = 1};
        }
        else if( k == 1){
          if( i < 2){ flag = 1};
        }
        else {
          if( i < 1){ flag = 1};
        }

        if ( flag == 1){
          var name = data[loc_array[j][k][i]][2];
          var detail = data[loc_array[j][k][i]][11];
          var cell = spreadSheet.getRange(cell_start[j][k][0] + i, cell_start[j][k][1]);
          cell.setValue(name);
          cell = spreadSheet.getRange(cell_start[j][k][0] + i, cell_start[j][k][1] + 1);
          cell.setValue(detail);
        }
  }
    }
  }
}

function token_system() {                                                                         // Main function which calls the other
    var spreadSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses");
    var dataRange = spreadSheet.getDataRange();
    // Fetch values for each row in the Range.
    var data = dataRange.getValues();
    var row;
  
    const TRB = [[],[],[]]                          // for Trunk road branch
    const GNB = [[],[],[]]                          // for Gandhi nagar branch
    const BNB = [[],[],[]]                          // for Balaji nagar branch
    const MGB = [[],[],[]]                          // for Magunta layout branch
    const BVB = [[[],[],[]],[[],[],[]],[[],[],[]]]  // for BV nagar branch

    const TRB_cellstart = [[3,2], [3,4], [3,6]];
    const GNB_cellstart = [[12,2], [12,4], [12,6]];
    const BNB_cellstart = [[21,2], [21,4], [21,6]];
    const MGB_cellstart = [[30,2], [30,4], [30,6]];
    const BVB_cellstart = [[[39,2], [42,2], [44,2]], [[39,4], [42,4], [44,4]], [[39,6], [42,6], [44,6]]];

    // an array of most used names for each branch
    const TRB_names = ["Trunk Road Branch","Dr. Nandan Manjunath (Cardiologist)","Dr. Dheeraj Kurukunda (Psychiatrist)","Dr. Umesh Karthikeya (ENT specialist)"];
    const GNB_names = ["Gandhi Nagar Branch","Dr. Venu (Cardiologist)","Dr. Siva (Psychiatrist)","Dr. Narendra (ENT specialist)"];
    const BNB_names = ["Balaji Nagar Branch","Dr. Sobha (Cardiologist)","Dr. Madhavi (Psychiatrist)","Dr. Radha (ENT specialist)"];
    const MGB_names = ["Magunta Layout Branch","Dr. Kishore (Cardiologist)","Dr. Vani (Psychiatrist)","Dr. Satyavathi (ENT specialist)"];
    const BVB_names = ["BV Nagar Branch","Dr. Sunnel (Cardiologist)","Dr. Lavanya (Psychiatrist)","Dr. Sanjana (ENT specialist)"];

    name_column = [6,7,8,9,10];     //columns of doctor names according to branch
  
    var subject1 = "Confirmation of Appointment";         //  Subject of Email for booked appointment
    var subject2 = "Non-Availability of Appointment";     //  Subject for Email for non-availability
  
    for (var i = 1; i < data.length; i++) {     //Aggregation of data for different branches and different doctors into arrays

        row = data[i];

        aggregate_location(TRB,TRB_names[0],TRB_names[1],TRB_names[2],TRB_names[3], row, i, name_column[0]);

        aggregate_location(GNB,GNB_names[0],GNB_names[1],GNB_names[2],GNB_names[3], row,  i, name_column[1]);

        aggregate_location(BNB,BNB_names[0],BNB_names[1],BNB_names[2],BNB_names[3], row,  i, name_column[2]);

        aggregate_location(MGB,MGB_names[0],MGB_names[1],MGB_names[2],MGB_names[3], row,  i, name_column[3]);

        aggregate_gender(BVB,BVB_names[0],BVB_names[1],BVB_names[2],BVB_names[3], row,  i, name_column[4]);

     }

    //  Removes the duplicate data from the array for each branch

    de_duplicator_location(TRB, data, name_column[0]);   
    de_duplicator_location(GNB, data, name_column[1]);
    de_duplicator_location(BNB, data, name_column[2]);
    de_duplicator_location(MGB, data, name_column[3]);
    de_duplicator_gender(BVB, data, name_column[4]);

    //  sends the email for each form filler

    email_sender_location(TRB, TRB_names, data, subject1, subject2);
    email_sender_location(GNB, GNB_names, data, subject1, subject2);
    email_sender_location(BNB, BNB_names, data, subject1, subject2);
    email_sender_location(MGB, MGB_names, data, subject1, subject2);
    email_sender_gender(BVB, BVB_names, data, subject1, subject2);

    token_list_location(TRB, TRB_cellstart, data);
    token_list_location(GNB, GNB_cellstart, data);
    token_list_location(BNB, BNB_cellstart, data);
    token_list_location(MGB, MGB_cellstart, data);
    token_list_gender(BVB, BVB_cellstart, data);
  
}