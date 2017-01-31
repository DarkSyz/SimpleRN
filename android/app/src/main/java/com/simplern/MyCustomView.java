package com.simplern;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.drawable.GradientDrawable;
import android.view.View;

public class MyCustomView extends View {
    private GradientDrawable mDrawable;
    private int mStartColor, mEndColor;

    public MyCustomView(Context context){
        super(context);
        mDrawable = new GradientDrawable();
        mDrawable.setOrientation(GradientDrawable.Orientation.LEFT_RIGHT);
    }

    @Override
    protected void onDraw(Canvas canvas){
        super.onDraw(canvas);
        mDrawable.setBounds(0, 0, getWidth(), getHeight());
        mDrawable.setColors(new int[]{mStartColor, mEndColor});
        mDrawable.draw(canvas);
    }

    public void setStartColor(int startColor){
        this.mStartColor = startColor;
    }
    public void setEndColor(int endColor){
        this.mEndColor = endColor;
    }
}

