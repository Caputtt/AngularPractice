import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TicketService} from "../../../services/tickets/ticket.service";
import {ITour} from "../../../models/tours";
import {TicketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BlocksStyleDirective} from "../../../directive/blocks-style.directive";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: ITour[];

  @ViewChild('tourWrap',{read: BlocksStyleDirective}) blockDirective:BlocksStyleDirective;
  @ViewChild('tourWrap') tourWrap: ElementRef;


  ticketsFiltered: ITour[]=[];
  ticketsCount: number = 0;
  ticketsFilteredCount: number = 0;


  constructor(private ticketService: TicketService,
              private ticketsStorage: TicketsStorageService,
              private router: Router,
              private route: ActivatedRoute) { }



  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (data) => {
            this.tickets = data;
            this.ticketsStorage.setStorage(data);


            this.ticketsFiltered = [...data];
            this.ticketsCount=this.tickets.length;
            this.ticketsFilteredCount=this.ticketsCount;
            console.log(data)
      }
    )
  }

  ngAfterViewInit() {

  }

  goToTicketInfoPage(item: ITour) {
    this.router.navigate([`/tickets/ticket/${item.id}`])
  }

  directiveRenderComplete(ev: boolean) {
    const el: HTMLElement = this.tourWrap.nativeElement;
    el.setAttribute('style', 'background-color: #fff0c4')
    this.blockDirective.initStyle(1)
  }

  searchTickets(ev:Event): void {
    const text = (ev?.target as HTMLInputElement).value;

    if (text == '' || text==undefined) {
      this.ticketsFiltered= [...this.ticketsStorage.getStorage()];
      this.ticketsFilteredCount=this.ticketsFiltered.length;
      return;
    }

    this.ticketsFiltered= this.ticketsStorage.getStorage().filter(
      t=>t.name.toUpperCase().includes(text.toUpperCase())
        || t.description.toUpperCase().includes(text.toUpperCase())
    );
    this.ticketsFilteredCount=this.ticketsFiltered.length;
  }


}
