import { renderHook } from "@testing-library/react-hooks";
import useWindowDimensions from "../../src/hooks/useWindowDimensions";

describe('useWindowDimensions hook', () => {
    it('should update width and height on window size change', () => {
        const { result } = renderHook(() => useWindowDimensions())

        const expectedWidth = 500;
        const expectedHeight = 1000;
        global.innerWidth = expectedWidth
        global.innerHeight = expectedHeight

        global.dispatchEvent(new Event('resize'));

        expect(result.current.width).toBe(expectedWidth)
        expect(result.current.height).toBe(expectedHeight)
    });
});