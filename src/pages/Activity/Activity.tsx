import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonChip,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Activity.css";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Activity = (props: any): any => {
  const history = useHistory();
  const [finalViewFillClick, setFinalViewFillClick] = useState();
  const [finalCommonView, setFinalCommonView] = useState();
  const [isCurrentGapsClick, setIsCurrentGapsClick] = useState(false);
  const [cQuestID, setCQuestID] = useState("");
  let currentQuestionIndex = 0;
  const [isCheckedState, setIsCheckedState] = useState(false);
  let [overallQuestions, setOverallQuestions] = useState<any | undefined>([]);
  let [fillClickOptionsList, setFillClickOptionsList] = useState([]);
  const questions: any = [
    {
      id: "77365072-7645-483a-a65e-8ff9d16942e1",
      title: "Gap Fill (Table) with Dialogue",
      type: "fillinthegapsclick",
      created: 1587385657,
      updated: 1587385883,
      scorable: true,
      image:
        "https://content.globalenglish.com/assets/2020-03/shutte81_365_1584449289_downsized.jpg",
      subtitle: "<p>Match the capital cities with the correct statements.</p>",
      dialogue: [
        {
          dialogueTitle: "Dialogue 1",
          dialogueLines: [
            {
              name: "Shaun",
              text: "Hello",
            },
            {
              name: "Max",
              text: "Hello",
            },
          ],
        },
        {
          dialogueTitle: "Dialogue 2",
          dialogueLines: [
            {
              name: "Shaun",
              text: "How are you?",
            },
            {
              name: "Max",
              text: "How are you?",
            },
          ],
        },
      ],
      help: null,
      config: {
        type: "table",
        content: {
          columnCount: "2",
          header: null,
          rows: [
            {
              type: "row",
              columns: [
                {
                  text: "The capital city of France.",
                },
                {
                  text: "<c-blank></c-blank>",
                },
              ],
            },
            {
              type: "row",
              columns: [
                {
                  text: "The capital city of the Czech Republic.",
                },
                {
                  text: "<c-blank></c-blank>",
                },
              ],
            },
            {
              type: "row",
              columns: [
                {
                  text: "What is the capital of Italy.",
                },
                {
                  text: "<c-blank></c-blank>",
                },
              ],
            },
            {
              type: "row",
              columns: [
                {
                  text: "What is the capital of India.",
                },
                {
                  text: "<c-blank></c-blank>",
                },
              ],
            },
          ],
        },
        items: [
          {
            correct: true,
            label: "Paris",
            hint: "",
            scoring: [
              {
                competency_category: {
                  title: "Business English",
                  id: "00d761c0-42eb-465a-8806-a3e55f22f0a7",
                },
                competency: "Grammer",
                points: 1,
              },
            ],
            itemId: 0,
          },
          {
            correct: true,
            label: "Prague",
            hint: "",
            scoring: [
              {
                competency_category: {
                  title: "Business English",
                  id: "00d761c0-42eb-465a-8806-a3e55f22f0a7",
                },
                competency: "Grammer",
                points: 2,
              },
            ],
            itemId: 1,
          },
          {
            correct: true,
            label: "Rome",
            hint: "",
            scoring: [
              {
                competency_category: {
                  title: "Business English",
                  id: "00d761c0-42eb-465a-8806-a3e55f22f0a7",
                },
                competency: "Grammer",
                points: 3,
              },
            ],
            itemId: 2,
          },
          {
            correct: true,
            label: "New Delhi",
            hint: "",
            scoring: [
              {
                competency_category: {
                  title: "Business English",
                  id: "00d761c0-42eb-465a-8806-a3e55f22f0a7",
                },
                competency: "Grammer",
                points: 2,
              },
            ],
            itemId: 3,
          },
        ],
        scoring: {
          ranges: null,
        },
      },
    },
  ];
  const gotoHome = () => {
    history.push("/home");
  };

  const resetGapClick = () => {
    const allElements: any = document.querySelectorAll('.gapClickUI');
    disableUserInteraction(false);
    for (let i = 0; i < allElements.length; i++) {
      allElements[i].classList.remove("is-active");
      allElements[i].classList.remove("ans-right");
      allElements[i].classList.remove("ans-wrong");
      allElements[i].innerText = "";
      allElements[i].setAttribute("custom-chosen-opt", "-1");
    }
    allElements[0].classList.add("is-active");
    const optionsList: any = document.querySelectorAll('.gapClickOption');
    for(let j=0; j < optionsList.length; j++){
      optionsList[j].classList.remove("hideOption");
    }
  };

  const gapClickUIClick = (e: any) => {
    const allElements: any = document.querySelectorAll(".is-active");
    let chosenOptID: string = "-1";
    for (let i = 0; i < allElements.length; i++) {
      allElements[i].classList.remove("is-active");
    }
    e.target.classList.contains("is-active")
      ? e.target.classList.remove("is-active")
      : e.target.classList.add("is-active");
    e.target.innerText = "";
    chosenOptID = e.target.getAttribute("custom-chosen-opt");
    if (chosenOptID !== "-1") {
      document
        .getElementById(`gapClickOption_${chosenOptID}`)
        ?.classList.remove("hideOption");
    }
    e.target.setAttribute("custom-chosen-opt", "-1");

    // remove text
    // take custom-chosen-opt value and remove hideOption class
    // change chosen
  };
  const renderFillInGapsClickUIElement = (index: string) => {
    return (
      <IonChip
        id={`gapClickUI_${index}`}
        className={`gapClickUI ${index === "0" ? "is-active" : ""}`}
        onClick={gapClickUIClick}
        custom-chosenOpt="-1"
      ></IonChip>
    );
  };
  const gapOptionClick = (e: any) => {
    // console.log(e.target) "gapClickOption_0".split("_")[1]
    const allElements: any = document.querySelectorAll(".is-active");
    let currentIDNumber: number = parseInt(e.target.id.split("_")[1]);
    console.log(currentIDNumber);
    const clickedOptionID: any = `gapClickOption_${currentIDNumber}` || "";
    const clickedEle: HTMLElement = document.getElementById(clickedOptionID)!;
    clickedEle.classList.add("hideOption");
    const activeElement: any = allElements[0]!;
    activeElement.setAttribute("custom-chosen-opt", currentIDNumber);
    activeElement.innerText = e.target.innerText || "";
    let currentSelectedElement = allElements[0];
    for (let i = 0; i < allElements.length; i++) {
      allElements[i].classList.remove("is-active");
    }
    const incrementedSelectedUI =
      parseInt(currentSelectedElement.id.split("_")[1]) + 1;
    if (
      incrementedSelectedUI < document.querySelectorAll(".gapClickUI").length
    ) {
      console.log(111, `gapClickUI_${incrementedSelectedUI}`);
      if (document.getElementById(`gapClickUI_${incrementedSelectedUI}`)) {
        document
          .getElementById(`gapClickUI_${incrementedSelectedUI}`)
          ?.classList.add("is-active");
      }
    } else {
      for (
        let i = 0;
        i < document.querySelectorAll(".gapClickUI").length;
        i++
      ) {
        let curEle: any = document.querySelectorAll(".gapClickUI")[i]!;
        if (curEle.getAttribute("custom-chosen-opt") === "-1") {
          curEle.classList.add("is-active");
          break;
        }
      }
    }
    // let remainingOptions: any = [];
    // let currentQuestion: any = overallQuestions.filter((quest: any)=>{
    //   return quest.id === cQuestID;
    // })
    // remainingOptions = currentQuestion[0].config.items.filter((item: any)=>{
    //   return item.itemId !== clickedOptionID
    // })
    // setFillClickOptionsList(remainingOptions);
  };
  const renderFillGapsClickOptions = (
    renderedQuestionRow: any,
    question: any
  ) => {
    // setFinalViewFillClick(renderedRows);
    fillClickOptionsList = fillClickOptionsList.sort( () => Math.random() - 0.5);
    console.log("fillClickOptionsList", fillClickOptionsList.sort( () => Math.random() - 0.5))
    const finalRender: any = (
      <div className="fillGapsWholeContainer">
        {renderedQuestionRow}
        <div className="fillGapsClickOptionsContainer">
          {fillClickOptionsList.map((opt: any) => {
            return (
              <IonChip
                id={`gapClickOption_${opt.itemId}`}
                className="gapClickOption"
                onClick={gapOptionClick}
              >
                <IonLabel id={`gapClickOptionLabel_${opt.itemId}`}>
                  {opt.label}
                </IonLabel>
              </IonChip>
            );
          })}
        </div>
      </div>
    );
    setFinalViewFillClick(finalRender);
    console.log("question", question);
  };
  const disableUserInteraction = (shouldDisable: boolean) => {
    if(shouldDisable){
      document.getElementsByClassName('fillGapsClickOptionsContainer')[0].classList.add('disabled');
      document.getElementsByClassName('fillGapsWholeContainer')[0].classList.add('disabled');
    }  else {
      document.getElementsByClassName('fillGapsClickOptionsContainer')[0].classList.remove('disabled');
      document.getElementsByClassName('fillGapsWholeContainer')[0].classList.remove('disabled');
    }
  }
  const checkAnswers = () => {
    let orgFillClickOptionsList: any = [];
    let finalCheckArr:any = [];
    disableUserInteraction(true);
    console.log("OA",overallQuestions[currentQuestionIndex].config.items);
    orgFillClickOptionsList = overallQuestions[currentQuestionIndex].config.items;
    orgFillClickOptionsList.sort((a:any,b:any) => (a.itemId > b.itemId) ? 1 : ((b.itemId > a.itemId) ? -1 : 0)); 
    console.log("OAT", orgFillClickOptionsList)
    orgFillClickOptionsList.map((orgItem: any)=>{ 
      console.log("333")
      let currentGapUI: any = document.getElementById(`gapClickUI_${orgItem.itemId}`)!;
      (currentGapUI?.getAttribute('custom-chosen-opt') === `${orgItem.itemId}`)?currentGapUI.classList.add('ans-right'):currentGapUI.classList.add('ans-wrong');
      let checkObj:any = {
        scoring:{
          current:(currentGapUI?.getAttribute('custom-chosen-opt') === `${orgItem.itemId}`)?orgItem.scoring[0].points:0,
          max:orgItem.scoring[0].points,
          competency: orgItem.scoring[0].competency,
          label: orgItem.label
        }
      }
      finalCheckArr.push(checkObj);
    })
    console.log("FIN", finalCheckArr)
  }
  const renderFillInGapsClickQuestions = (question: any) => {
    const questionRows: any = question.config
      ? question.config.content.rows || []
      : [];
    let renderedRows: any = [];
    console.log(questionRows, 1);
    for (let i = 0; i < questionRows.length; i++) {
      renderedRows.push(
        <div className="fillClickRowContainer">
          {questionRows[i].columns.map((col: any, index: number) => {
            return col.text.indexOf("<c-blank>") >= 0 ? (
              renderFillInGapsClickUIElement(`${i}`)
            ) : (
              <div className="fillClickRowEle fillClickLabel">{col.text}</div>
            );
          })}
        </div>
      );
    }
    console.log(renderedRows);
    renderFillGapsClickOptions(renderedRows, question);
  };
  const initLoadActivity = (questions: any, activityIndex: number) => {
    setOverallQuestions(questions);
    console.log("SS", questions);
    setCQuestID(questions[activityIndex].id);
    let allRenderedQuestions = [];
    switch (questions[activityIndex].type) {
      case "fillinthegapsclick":
        if (fillClickOptionsList.length <= 0) {
          setFillClickOptionsList(questions[activityIndex].config.items);
        }
        allRenderedQuestions.push(
          renderFillInGapsClickQuestions(questions[activityIndex])
        );
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    console.log(questions);
    if (questions && questions.length > 0) {
      initLoadActivity(questions, 0);
    }
    // gapClickUIClick()
  }, []);
  useEffect(() => {
    console.log("12");
    if (overallQuestions && overallQuestions.length > 0) {
      initLoadActivity(overallQuestions, 0);
    }
  }, [fillClickOptionsList]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle onClick={gotoHome}>Activity Player</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={false}>
        <div className="buttons-container">
          <IonButton
            className="loaderButton"
            color="primary"
            onClick={resetGapClick}
          >Reset</IonButton>
          <IonButton
            className="loaderButton"
            color="primary"
            onClick={checkAnswers}
          >Check</IonButton>
          
        </div>
        <div className="dynamicContent">{finalViewFillClick}</div>
        <div className="commonContent">
          {overallQuestions &&
            overallQuestions.length > 0 &&
            overallQuestions[currentQuestionIndex].image && (
              <div>
                <img src={overallQuestions[currentQuestionIndex].image} />
              </div>
            )}
          {overallQuestions &&
            overallQuestions.length > 0 &&
            overallQuestions[currentQuestionIndex].jw_video && (
              <div>SHOW VIDEO</div>
            )}
          {overallQuestions &&
            overallQuestions.length > 0 &&
            overallQuestions[currentQuestionIndex].audio && (
              <div>SHOW AUDIO</div>
            )}
        </div>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Welcome Home</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <Button>Activity</Button>
      </IonContent>
    </IonPage>
  );
};

export default Activity;
