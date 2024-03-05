import "@testing-library/jest-dom";
import { setupServer } from "msw/native";
import { handlers } from "./mocks/handlers";
import { TextEncoder } from 'util';

global.TextEncoder = TextEncoder;


const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
