import create from "zustand";
import produce from "immer";
import { deepSet, deepGet } from "helpers/object";

export const useStore = create((set) => ({
  gitHub:{
    repos:[],
    repo:[],
    content:{},
    selectedRepo:{},
    selectedContent:'',
  },
  gpt:{

  },
  setAttr: (_in: { path: string; value: any }) =>
    set(
      produce((_) => {
        deepSet(_, _in.path, _in.value);
      })
    ),
  pushElement: (_in: { path: string; element: any }) =>
    set(
      produce((_) => {
        deepGet(_, _in.path).push(_in.element);
      })
    ),
  removeElement: (_in: { path: string; index: string }) =>
    set(
      produce((_) => {
        deepGet(_, _in.path).splice(_in.index, 1);
      })
    ),
}));
