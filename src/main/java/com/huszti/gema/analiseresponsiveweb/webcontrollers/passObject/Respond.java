package com.huszti.gema.analiseresponsiveweb.webcontrollers.passObject;

import lombok.Data;

@Data
public class Respond {
    private String link;
    private String text;
    private int motiv;


    Respond(String link, String text, int motiv) {
        this.link = link;
        this.text = text;
        this.motiv = motiv;
    }
}
