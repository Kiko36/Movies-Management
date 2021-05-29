import React from "react";
// import _ from "lodash";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > * + *': {
        display: "flex",
        marginTop: theme.spacing(1),
        justifyContent: "center"
      },
    },
  }));

const PaginationComp = (props) => {

      const classes = useStyles();
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
      setPage(value);
      props.changePage(value)
    };

    return (

      <div className={classes.root}>
        <Typography>Page: {page}</Typography>
        <Pagination count={localStorage.getItem("pagesCount")} page={page} onChange={handleChange} />
      </div>  
    );
  };

export default PaginationComp;