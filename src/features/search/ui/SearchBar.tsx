import { formatRegion } from "@/shared/lib/formatRegion";
import { useRegionSearch } from "../model/useRegionSearch";

export const SearchBar = () => {
  const { keyword, setKeyword, filteredRegions } = useRegionSearch();
  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="지역명을 입력하세요"
        className="w-full border rounded px-3 py-2"
      />

      {filteredRegions.length > 0 && (
        <ul className="border rounded mt-2 max-h-60 overflow-auto">
          {filteredRegions.map((region) => (
            <li key={region} className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
              {formatRegion(region)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
