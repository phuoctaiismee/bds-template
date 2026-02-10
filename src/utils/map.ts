interface GetGGMapDirectionUrlParams {
  from?: {
    lng: number;
    lat: number;
  };
  to?: {
    lng: number;
    lat: number;
  };
}

export const getGGMapDirectionUrl = ({ from, to }: GetGGMapDirectionUrlParams) => {
  return `https://www.google.com/maps/dir/${from ? [from.lat, from.lng].join(',') : ''}/${to ? [to.lat, to.lng].join(',') : ''}`;
};
