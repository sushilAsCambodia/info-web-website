import moment from "moment/moment";

const initialState = { 
    status: 'idle',
    journals:[],
    journalDetail:[],
    issue:{},
    years:[],
    loading:false,
    yearLoading:false,
    loadingJournalDetail:false,
}
const JournalReducer =  (state = initialState, action) => {
  switch (action.type) {
    case 'journal/list/pending':
      return {
        ...state, 
        loading:true,
        status:'pending'
      };
    case 'journal/list/fulfilled':
      let journals = action.payload?.data;
      if(journals.length > 0) {
        journals= journals.filter(j => j.status === 1).sort(function(a, b) {
          return  parseInt(b.sorting) - parseInt(a.sorting);
        }); 
      }
      return {
        ...state,
        journals: journals || [],
        status:'completed',
        loading: false
      };
    // get journal detail
    case 'journal/album-details/pending':
      return {
        ...state, 
        loadingJournalDetail:true,
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
      const djournalDetials = action.payload?.data; 
      return {
        ...state,
        journalDetail: djournalDetials.map(r => { r.album_slavs = []; return r; }) || [],
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
        yearLoading:true,
        years:[],
        status:'pending'
      };
    case 'journal/album/year/fulfilled':
      const {data} = action.payload;
      let uniqueYear = [];
      if(data && Object.keys(data).length) {
        const years = data?.data || [];
        if(years.length>0) {
          const getField = years.map(r => {
            r['year'] = moment(r.issue_date).format('yyyy');
            return r['year'];
          });
          if(getField.length > 0) {
            uniqueYear = getField.sort().filter((value, index, array) =>  array.indexOf(value) === index);
          }
        }
      }
      return {
        ...state,
        status:'completed',
        years: uniqueYear,
        yearLoading:false,
      };
    case 'journal/album/year/rejected':
      return {
        ...state, 
        yearLoading:false,
        years:[],
        status:'failed'
      };
    // get album year block 
    // get selected issue
    case 'journal/album/selected-issue/pending':
      return {
        ...state, 
        loadingJournalDetail:true,
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
        loadingJournalDetail:false,
      };
    case 'journal/album/selected-issue/rejected':
      return {
        ...state, 
        loadingJournalDetail:false,
        status:'failed'
      };
    case 'CLEAR_SELECTED_ISSUE':
      return {
        ...state, 
        loadingJournalDetail: false,
        journalDetail: [{
          album_slavs:   []
        }],
        status: ''
      };
    // end selected issue
  }
  return state;
}
export default JournalReducer;