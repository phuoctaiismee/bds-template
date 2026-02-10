import { CardActionArea } from '@mui/material';
import { MapPin, TrendingUp } from 'lucide-react';
import { SUGGESTIONS } from './contants';
const SearchSuggestions = () => (
  <div className="grid grid-cols-1 gap-6 pb-32 md:grid-cols-2 md:gap-8 md:pb-0">
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.recent.map((item) => (
          <CardActionArea
            key={item}
            className="w-fit cursor-pointer rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            {item}
          </CardActionArea>
        ))}
      </div>

      <div>
        <h4 className="text-primary mb-3 flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
          <TrendingUp className="h-3.5 w-3.5" /> Xu hướng
        </h4>
        <div className="space-y-2">
          {SUGGESTIONS.trending.map((proj, idx) => (
            <CardActionArea
              key={proj}
              className="group flex cursor-pointer items-center justify-start gap-3 rounded-xl p-2 hover:bg-blue-50"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-500 group-hover:bg-blue-200 group-hover:text-blue-700">
                #{idx + 1}
              </div>
              <span className="group-hover:text-primary text-sm font-bold text-gray-700">{proj}</span>
            </CardActionArea>
          ))}
        </div>
      </div>
    </div>

    <div>
      <h4 className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wider text-gray-400 uppercase">
        <MapPin className="h-3.5 w-3.5" /> Khu vực Hot
      </h4>
      <div className="grid grid-cols-2 gap-2">
        {SUGGESTIONS.districts.map((dist) => (
          <CardActionArea
            key={dist}
            className="hover:border-primary/50 cursor-pointer rounded-xl border border-gray-100 p-3 text-center hover:bg-blue-50"
          >
            <span className="mb-1 block text-sm font-bold text-gray-700">{dist}</span>
            <span className="inline-block rounded-full bg-gray-50 px-2 py-0.5 text-[10px] text-gray-400">
              1.2k tin
            </span>
          </CardActionArea>
        ))}
      </div>
    </div>
  </div>
);

export default SearchSuggestions;