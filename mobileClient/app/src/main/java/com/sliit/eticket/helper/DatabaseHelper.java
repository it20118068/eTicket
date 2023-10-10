package com.sliit.eticket.helper;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

/*
 *  This class is use to make database operations
 * */
public class DatabaseHelper extends SQLiteOpenHelper {

    public static final String DATABASE_NAME = "eticketNew";
    public static final int DATABASE_VERSION = 1;

    public static final String TABLE_NAME = "user";
    public static final String COLUMN_USERNAME = "username";
    public static final String COLUMN_LOGGED = "logged";
    public static final String COLUMN_TOKEN = "token";

    public static final String COLUMN_NIC = "nic";


    public static final String COLUMN_ID = "id";

    public DatabaseHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        String createTableQuery = "CREATE TABLE " + TABLE_NAME + " (" +
                COLUMN_ID + " INTEGER PRIMARY KEY," +
                COLUMN_USERNAME + " TEXT," +
                COLUMN_LOGGED + " INTEGER," +
                COLUMN_NIC + " TEXT," +
                COLUMN_TOKEN + " TEXT)";
        db.execSQL(createTableQuery);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        // Handle database upgrades if needed
//        if (oldVersion < 11) {
//            // Upgrade logic for version 2 (adding new column)
//            db.execSQL("ALTER TABLE " + TABLE_NAME + " ADD COLUMN " + COLUMN_ID + " INTEGER DEFAULT 0");
//        }
    }


}
