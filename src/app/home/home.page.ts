import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AuthService } from '../servicios/auth.service';
import { observable, Observable } from 'rxjs';
import { ChatService } from '../servicios/chat.service';
import { ChatComponent } from '../componentes/chat/chat.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  chats: any = [];
  public mensajes: any = [];
  public bd: Observable<any[]> = new Observable();

  constructor(
    private s: AuthService,
    private modal: ModalController,
    public asc: ActionSheetController,
    public chatService: ChatService,
  ) { }
  ngOnInit(): void {
    this.chatService.getChatRooms().subscribe(
      (chatsBd) => {
        this.chats = chatsBd;
      }
    )
  }
  
  async presentActionSheet() {
    const actionSheet = await this.asc.create({
      header: "opciones",
      cssClass: "fondo",
      buttons: [{
        text: "cerrar sesion",
        role: "destuctive",
        icon: "log-out",
        handler: () => {
          this.salir();
        }
        
      },
      {
        text: "Cancelar",
        role: "cancel",
        icon: "close"
      }
      ]
    });
    await actionSheet.present();
  }

  salir() {
    this.s.logout();
  }
  
  openChat(chat: any) {
    this.modal.create({
      component: ChatComponent,
      componentProps: {
        chat,
      }
    }
    )
      .then((m) => m.present());
  
  }


}
