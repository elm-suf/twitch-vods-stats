import { DatePipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { VodItem } from "../../server/handlers/getVideosByUser";

@Component({
  selector: "app-vod-list-item",
  imports: [DatePipe, RouterLink],
  template: `
    <li>
      <a
        class="flex items-center gap-4 px-4 py-3 justify-between border-b border-[#253c46] hover:bg-[#253c46] hover:border-transparent"
        [routerLink]="['/vods/' + video.id]"
      >
        <div class="flex items-center gap-4">
          <div
            class="bg-center bg-no-repeat aspect-video bg-cover rounded-lg h-14 w-fit"
            [style.background-image]="'url(' + video.thumbnailUrl + ')'"
          ></div>
          <div class="flex flex-col justify-center">
            <p
              class="text-white text-base font-medium leading-normal line-clamp-1"
            >
              Title: {{ video.title }}
            </p>
            <p
              class="text-[#94b8c7] text-sm font-normal leading-normal line-clamp-2"
            >
              {{ video.duration }} • {{ video.creationDate | date }}
            </p>
          </div>
        </div>
        <div class="shrink-0">
          <div
            class="text-white flex size-7 items-center justify-center"
            data-icon="DotsThreeVertical"
            data-size="24px"
            data-weight="regular"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path
                d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM128,72a12,12,0,1,0-12-12A12,12,0,0,0,128,72Zm0,112a12,12,0,1,0,12,12A12,12,0,0,0,128,184Z"
              ></path>
            </svg>
          </div>
        </div>
      </a>
    </li>
  `,
})
export class VodListItemComponent {
  @Input() video!: VodItem;
}
