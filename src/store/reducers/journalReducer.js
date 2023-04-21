import moment from "moment/moment";

const initialState = { 
    status: 'idle',
    journals:[],
    journalDetail:[],
    issue:{},
    years:[],
    loading:false,
    loadingJournalDetail:false,
}
export default function (state = initialState, action) {
  switch (action.type) {
    case 'journal/list/pending':
      return {
        ...state, 
        loading:true,
        status:'pending'
      };
    case 'journal/list/fulfilled':
      return {
        ...state,
        journals: action.payload?.data || [],
        status:'completed',
        loading: false
      };
    // get journal detail
    case 'journal/album-details/pending':
      return {
        ...state, 
        loadingJournalDetail:true,
        journalDetail: [],
        status:'pending'
      };
    case 'journal/album-details/rejected':
      return {
        ...state, 
        loadingJournalDetail:false,
        journalDetail: [],
        status:'failed'
      };
    case 'journal/album-details/fulfilled':
      return {
        ...state,
        journalDetail: action.payload?.data || [],
        status:'completed',
        loadingJournalDetail: false
      };
    // end journal detail
    // issue block
    case 'journal/issue/list/pending':
      return {
        ...state, 
        loading:true,
        issue:{},
        status:'pending'
      };
    case 'journal/issue/list/fulfilled':
      return {
        ...state,
        status:'completed',
        issue: action.payload?.data || {},
        loading: false
      };
    case 'journal/issue/list/rejected':
      return {
        ...state, 
        loading:false,
        issue:{},
        status:'failed'
      };
    // end issue block
    // get album year block
    case 'journal/album/year/pending':
      return {
        ...state, 
        loading:true,
        years:[],
        status:'pending'
      };
    case 'journal/album/year/fulfilled':
      const {data} = action.payload;
      // let uniqueYear = [2020,2021,2022,2023,2024,2025];
      let uniqueYear = [];
      if(data && Object.keys(data).length) {
        const years = data?.data || [];
        if(years.length>0) {
          const getField = years.map(r => {
            r['year'] = moment(r.issue_date).format('yyyy');
            return r['year'];
          });
          if(getField.length > 0) {
            uniqueYear = getField.filter((value, index, array) =>  array.indexOf(value) === index);
          }
        }
      }
      return {
        ...state,
        status:'completed',
        years: uniqueYear,
        loading: false
      };
    case 'journal/album/year/rejected':
      return {
        ...state, 
        loading:false,
        years:[],
        status:'failed'
      };
    // get album year block 
    // get selected issue
    case 'journal/album/selected-issue/pending':
      return {
        ...state, 
        loading:true,
        journalDetail: [{
          album_slavs:   []
        }],
        status:'pending'
      };
    case 'journal/album/selected-issue/fulfilled':
      return {
        ...state,
        status:'completed',
        journalDetail: [{
          album_slavs: action.payload?.data?.data || []
        }],
        loading: false
      };
    case 'journal/album/selected-issue/rejected':
      return {
        ...state, 
        loading:false,
        status:'failed'
      };
    // end selected issue
  }
  return state;
}