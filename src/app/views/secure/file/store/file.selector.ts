import { AppState } from 'src/app/app.reducer';

export const selectFileState = (state: AppState) => state.fileState;
