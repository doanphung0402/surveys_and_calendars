import {
  Card,
  Typography,
  CssBaseline,
  Grid,
  Container,
  Paper,
  MenuItem,
  ButtonGroup,
  Button,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  Box,
  makeStyles,
} from "@material-ui/core";
import { ArrowDropDownCircleOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import SurveyItems from "./SurveyItems";
import AddBoxIcon from "@material-ui/icons/AddBox";
import axios from "axios";
import URL from "../../Config/URL";
import { useHistory } from "react-router-dom";
import { Pagination } from "@material-ui/lab";
import HttpCode from "../../Constaint/HttpCode";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const options = ["Khảo sát đã nhận", "Khảo sát đã gửi", "Tất cả"];

const useStyles = makeStyles((theme) => ({
  root: { 
      marginTop:"50px", 
      
      width:"100%"
    
  },
}));
const SplitButton = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Grid container direction="column" alignItems="center" color="#FFFFFF">
      <Grid item xs={12}>
        <ButtonGroup
          variant="contained"
          ref={anchorRef}
          aria-label="split button"
        >
          <Button onClick={handleClick}>{options[selectedIndex]}</Button>
          <Button
            // color="primary"
            size="small"
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownCircleOutlined />
          </Button>
        </ButtonGroup>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        // disabled={index === 2}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
};
///////////////////////////////////////////
const Survey = () => {
  const history = useHistory();
  const classes = useStyles();
  const [page,setPage] = useState(1); 
  const [totalPage,setTotalPage] = useState(1); 
  const [survey,setSurvey] = useState([]); 
  const userInfo = useSelector(state=>state.auth.userInfo); 
  useEffect(() => {
    axios({
      url : `${URL.getPaginationPage}?page=${page}`,
      method : "post", 
      data : {
        email :userInfo.email 
      }
   }).then(data=>{
       if(data.data.message===HttpCode.ERROR){
          toast.error("Lỗi hệ thống .Vui lòng thử lại ! ")
       }else{
          setSurvey(data.data.payload.data.survey); 
          setTotalPage(data.data.payload.data.totalPage); 
          console.log(data.data.payload.data.survey)
       }
    })
  },[]);
  const handleCreateSurvey = () => {
    history.push("/survey/create-survey");
  };
  const handleChange =(event,page)=>{
      setPage(page); 
  }; 
  const renderSurveyItem =(survey) =>{
    // const   xml = 
  }
  return (
    <div>
      <Container>
        <Card
          style={{
            border: "2px",
            height: "250px",
            marginTop: "33px",
            marginLeft: "188px",
            marginRight: "188px",
          }}
        >
          <Typography variant="h4" style={{ margin: "33px" }}>
            Tạo khảo sát của bạn{" "}
          </Typography>
          <Typography variant="h5">
            Tạo lịch cho các cuộc họp, tạo lượt đặt chỗ và quản lý lịch biểu của
            bạn - tất cả đều có trong Project1 .
          </Typography>
        </Card>
        <CssBaseline />
        <Grid container style={{ marginTop: "100px" }}>
          <Grid item xs={8}>
            <Box>
              <Card
                style={{
                  marginLeft: "33px",
                  marginBottom: "50px",
                  padding: "25px",
                }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={8}>
                    <Grid
                      container
                      spacing={3}
                      style={{ marginBottom: "90px" }}
                    >
                      <Grid item xs={3}>
                        <Typography variant="h5"> Khảo sát </Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <SplitButton />
                      </Grid>
                      <CssBaseline />
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h4">
                      <Button
                        onClick={handleCreateSurvey}
                        startIcon={<AddBoxIcon />}
                        variant="contained"
                        color="secondary"
                      >
                        Tạo khảo sát mới{" "}
                      </Button>
                    </Typography>
                  </Grid>

                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    wrap="nowrap"
                  >
                   
                    <Grid item xs={12}>
                      <SurveyItems />
                    </Grid>
                    {/* {renderSurveyItem(page)} */}
                  </Grid>
                  <Box className={classes.root}>
                     <Pagination  onChange={handleChange} count={totalPage} color="primary" />
                  </Box>
                </Grid>
              </Card>
              <CssBaseline />
            </Box>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Survey;