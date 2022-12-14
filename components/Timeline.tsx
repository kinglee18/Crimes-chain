import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import Typography from '@mui/material/Typography';
import { Timeline } from '@mui/lab';
import { MissingPeople } from '../dapp/typechain-types';
import moment from 'moment';
import { Article } from '@mui/icons-material';
import { Button, Container, Stack, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Dispatch, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Web3Context } from '../context/web3Provider';

interface CustomizedTimelineProps {
  record: MissingPeople.ReportStructOutput,
  submitTip: Dispatch<any>,
  followUpReports: MissingPeople.FollowUpReportStruct[]
};

export function CustomizedTimeline({ record, submitTip, followUpReports }: CustomizedTimelineProps) {
  const { peopleContract } = useContext(Web3Context);

  const [tip, setTip] = useState<string | undefined>();
  const router = useRouter();
  const { id } = router.query;

  const payReward = async (reportF) => {
    let sss = await peopleContract.sendReward(0,0);
    debugger
  }
  return (
    <Container>
      <Timeline position="alternate">
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
            {`${moment(Number.parseInt((record.created * 1000 ).toString())).format('DD-MMM-YYYY HH:MM')}`}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color='primary'>
              <Article />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Report created
            </Typography>
            <Typography>{record.reporter.toString()}</Typography>
          </TimelineContent>
        </TimelineItem>
        {
          followUpReports.map((reportF, index) => (
            <>
              <TimelineItem>
                <TimelineOppositeContent
                  sx={{ m: 'auto 0' }}
                  variant="body2"
                  align="left"
                  color="text.secondary"
                >
                  {`${moment((reportF.created * 1000)).format('DD-MMM-YYYY')}`}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot color="secondary">
                    <LaptopMacIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }} key={`follow_up${index}`}>
                  <Typography variant="h6" component="span" onClick={() => payReward(reportF)}>
                    Tip <small style={{color :'blue', cursor: 'pointer'}} >({`${reportF.paid === true ? 'Paid': 'Send reward'}`}) </small>
                  </Typography>
                  <Typography>{reportF.description.toString()}</Typography>
                </TimelineContent>
              </TimelineItem>
            </>
          ))
        }
      </Timeline>

      <Stack direction={'row'}>
        <TextField
          fullWidth
          label="Submit a Tip"
          placeholder='You can receive 1 or 2 LINK tokens if your information is valuable'
          name="tip"
          variant="filled"
          onChange={e => setTip(e.target.value)}
          type='text'
          value={tip}
        />
        <Button variant="contained" onClick={() => submitTip(tip)} disabled={tip === undefined}>
          <SendIcon />
        </Button>
      </Stack>
    </Container>

  );
}