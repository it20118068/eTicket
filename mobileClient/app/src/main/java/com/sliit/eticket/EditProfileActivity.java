package com.sliit.eticket;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.sliit.eticket.dto.AppUserDto;
import com.sliit.eticket.dto.RequestDto;
import com.sliit.eticket.dto.ResponseDto;
import com.sliit.eticket.helper.DatabaseHelper;
import com.sliit.eticket.service.i.ReservationService;
import com.sliit.eticket.service.i.UserService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/*
 *  Edit User Profile Activity
 * */
public class EditProfileActivity extends AppCompatActivity {

    private AppUserDto userDto;
    private EditText fname, lname, nic, mobile, email, username, password;

    private String token;

    private UserService userService;
    private static final String BASE_URL = "http://10.0.2.2:7211/api/";
    Context context;
    private DatabaseHelper databaseHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_profile);

        databaseHelper = new DatabaseHelper(this);
        fetchDetails();
        context = this;
        fname = findViewById(R.id.txtFname);
        lname = findViewById(R.id.txtLname);
        nic = findViewById(R.id.txtNIC);
        mobile = findViewById(R.id.txtMobile);
        email = findViewById(R.id.txtEmail);
        username = findViewById(R.id.txtUsername);
        password = findViewById(R.id.txtPassword);

        Intent i = getIntent();
        userDto = (AppUserDto) i.getSerializableExtra("PROFILE");

        fname.setText(userDto.getFirstName());
        lname.setText(userDto.getLastName());
        nic.setText(userDto.getNic());
        mobile.setText(userDto.getMobileNo());
        email.setText(userDto.getEmail());
        username.setText(userDto.getUserName());
        password.setText(userDto.getPassword());

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        userService = retrofit.create(UserService.class);



    }

    public void handleUpdate(View view) {


        userDto.setFirstName(fname.getText().toString());
        userDto.setLastName(lname.getText().toString());
        userDto.setNic(nic.getText().toString());
        userDto.setEmail(mobile.getText().toString());
        userDto.setMobileNo(email.getText().toString());
        userDto.setUserName(username.getText().toString());
        userDto.setPassword(password.getText().toString());

        RequestDto requestDto = new RequestDto();
        requestDto.setUserDTO(userDto);

        Call<ResponseDto> call = userService.updateUserProfileById("Bearer " + token, requestDto);

        //Make an api call to update user profile
        call.enqueue(new Callback<ResponseDto>() {
            @Override
            public void onResponse(Call<ResponseDto> call, Response<ResponseDto> response) {
                if(response != null){
                    Toast.makeText(context, "Profile Updated Successfully",Toast.LENGTH_LONG).show();
                    Intent i = new Intent(context, MainActivity.class);
                    startActivity(i);

                } else {
                    Toast.makeText(context, "Something went wrong, please try again.",Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<ResponseDto> call, Throwable t) {
                Toast.makeText(context,t.getMessage(),Toast.LENGTH_LONG).show();
            }
        });


    }
    // handle back button click
    public void handleBack(View view) {
        this.finish();
    }


    // Fetch required data from local DB
    private void fetchDetails (){
        SQLiteDatabase db = databaseHelper.getReadableDatabase();

        Cursor cursor = db.query(
                DatabaseHelper.TABLE_NAME,
                new String[]{DatabaseHelper.COLUMN_ID, DatabaseHelper.COLUMN_NIC, DatabaseHelper.COLUMN_LOGGED, DatabaseHelper.COLUMN_TOKEN},
                DatabaseHelper.COLUMN_ID + " = ?",
                new String[]{String.valueOf(1)},
                null,
                null,
                null
        );

        if (cursor != null && cursor.moveToFirst()) {

            int tokenIndex = cursor.getColumnIndex(DatabaseHelper.COLUMN_TOKEN);

            this.token = cursor.getString(tokenIndex);
        }

        if (cursor != null) {
            cursor.close();
        }

        db.close();
    }
}