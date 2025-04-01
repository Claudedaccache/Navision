import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  memo,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import Grid from "@mui/material/Grid2";
import { v4 as uuidv4 } from "uuid";
import {
  SpeedDial,
  SpeedDialAction,
  Dialog,
  DialogTitle,
  DialogContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Typography,
  Checkbox,
  Button,
  Box,
  Tooltip,
  Stack,
  ToolbarProps,
  useTheme,
  useMediaQuery,
  IconButton,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
  Select,
  MenuItem,
} from "@mui/material";

import {
  ExpandMore as ExpandMoreIcon,
  Event as EventIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  LocalHospital as LocalHospitalIcon,
  BeachAccess as BeachAccessIcon,
  EventNote as EventNoteIcon,
  ArrowBackIosNew as ArrowBackIosNewIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  Today as TodayIcon,
  Close as CloseIcon,
  Download,
  DirectionsBike as DirectionsBikeIcon,
  DirectionsBus as DirectionsBusIcon,
  DirectionsWalk as DirectionsWalkIcon,
  Home as HomeIcon,
  DirectionsCar as DirectionsCarIcon,
} from "@mui/icons-material";

import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isWeekend,
  startOfWeek,
  getDay,
  parse,
} from "date-fns";
import { fr, Locale } from "date-fns/locale";
import { Calendar, dateFnsLocalizer, DateLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  dayOffColors,
  daysOff,
  missionTypes,
  timeColors,
  timeOptions,
  transportationOptions,
} from "../../data/data";
import { MissionType } from "../../data/types";
import toast from "react-hot-toast";
import { useUserContext } from "../../context/userContext";
import EventProgress from "./StatisticSection";

type Event = {
  id: string;
  event: MissionType;
  transport: string;
  time: string;
  day: string;
};

interface AdjustedEvent {
  title: string;
  start: Date;
  end: Date;
  color: string;
  missionType: string;
  transport: string;
  time: string;
  isDayOff: boolean;
  status?: "sick" | "vacation" | "other";
  period?: string;
  note?: string;
}

type EventContextType = {
  events: Event[];
  addEvent: (event: Omit<Event, "id">) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (id: string) => void;
  dialogType:
    | "create"
    | "edit"
    | "delete"
    | "edit-list"
    | "delete-list"
    | "download"
    | null;
  setDialogType: (type: EventContextType["dialogType"]) => void;
  selectedEvent: Event | null;
  setSelectedEvent: (event: Event | null) => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleCloseWithReset: () => void;
};

type EventProviderProps = {
  children: ReactNode;
};
interface SelectionCardProps {
  value: string | MissionType;
  selected: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}
interface StepAccordionProps {
  title: string;
  expanded: string | false;
  panel: string;
  onExpand: (
    panel: string
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  selectedOption?: string | MissionType | null;
  children: React.ReactNode;
}
interface EventDialogProps {
  open: boolean;
  handleClose: () => void;
  mode: "create" | "edit" | "download";
  eventToEdit?: Event | null;
}

type FormData = {
  event: MissionType | null;
  transport: string | null;
  time: string | null;
  day?: string | null;
  days?: string[];
};

interface EventListDialogProps {
  open: boolean;
  onClose: () => void;
  mode: "edit" | "delete";
  onSelect: (event: Event) => void;
}

const locales: { [key: string]: Locale } = {
  fr: fr,
};

const localizer: DateLocalizer = dateFnsLocalizer({
  format: (date: Date, formatStr: string, options?: { locale: Locale }) =>
    format(date, formatStr, { locale: locales.fr, ...options }),
  parse: (
    dateString: string,
    formatStr: string,
    options?: { locale: Locale }
  ) =>
    parse(dateString, formatStr, new Date(), {
      locale: locales.fr,
      ...options,
    }),
  startOfWeek: (date: Date, options?: { locale: Locale }) =>
    startOfWeek(date, { locale: locales.fr, ...options }),
  getDay: (date: Date) => getDay(date),
  locales,
});

const messages = {
  allDay: "Toute la journée",
  previous: "Précédent",
  next: "Suivant",
  today: "Aujourd'hui",
  month: "Mois",
  week: "Semaine",
  day: "Jour",
  agenda: "Agenda",
  date: "Date",
  time: "Heure",
  event: "Événement",
  noEventsInRange: "Aucun événement dans cette période.",
};
const adjustToLocalTime = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12);
};

// Custom Toolbar Component
const CustomToolbar: React.FC<
  ToolbarProps<
    {
      title: string;
      start: Date;
      end: Date;
      color: string;
      missionType: string;
      transport: string;
      time: string;
      isDayOff?: boolean;
      status?: string;
      note?: string;
    },
    object
  >
> = ({ label, onNavigate, onView, views, view }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignsize: { xs: "flex-start", sm: "center" },
        gap: 2,
        mb: 2,
        p: 1,
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
      }}
    >
      {/* Navigation Controls */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          order: { xs: 2, sm: 1 },
          width: { xs: "100%", sm: "auto" },
          justifyContent: { xs: "space-between", sm: "flex-start" },
        }}
      >
        <IconButton onClick={() => onNavigate("PREV")} size="small">
          <ArrowBackIosNewIcon fontSize={isMobile ? "small" : "medium"} />
        </IconButton>

        <IconButton
          onClick={() => onNavigate("TODAY")}
          size="small"
          sx={{ mx: { xs: 0, sm: 1 } }}
        >
          <TodayIcon fontSize={isMobile ? "small" : "medium"} />
        </IconButton>

        <IconButton onClick={() => onNavigate("NEXT")} size="small">
          <ArrowForwardIosIcon fontSize={isMobile ? "small" : "medium"} />
        </IconButton>

        {!isMobile && (
          <Chip
            label={label}
            sx={{
              ml: 1,
              p: "1rem",
              fontWeight: 500,
              backgroundColor: theme.palette.orange.light,
              fontSize: "1.5rem",
              textTransform: "capitalize",
              color: "white",
            }}
          />
        )}
      </Box>

      {/* View Switcher */}
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(_, newView) => newView && onView(newView)}
        size="small"
        sx={{
          order: { xs: 1, sm: 2 },
          width: { xs: "100%", sm: "auto" },
          justifyContent: { sm: "normal" },
        }}
      >
        {Array.isArray(views) &&
          views.map((v) => (
            <ToggleButton
              key={v}
              value={v}
              sx={{
                textTransform: "capitalize",
                px: { xs: 1, sm: 2 },
                flex: 1,
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                "&.Mui-selected": {
                  backgroundColor: theme.palette.orange.light,
                  color: theme.palette.primary.main,
                },
              }}
            >
              {v}
            </ToggleButton>
          ))}
      </ToggleButtonGroup>

      {isMobile && (
        <Chip
          label={label}
          sx={{
            width: "100%",
            order: 3,
            fontWeight: 500,
            backgroundColor: theme.palette.action.selected,
          }}
        />
      )}
    </Box>
  );
};

const EventContext = createContext<EventContextType | undefined>(undefined);

const CalendarCaption = () => {
  return (
    <Box
      sx={{
        marginTop: "10px",
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {[...Object.entries(dayOffColors), ...Object.entries(timeColors)].map(
        ([time, color]) => (
          <Box
            key={time}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <Box
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: color,
                marginRight: "8px",
              }}
            />
            <Typography variant="body2" style={{ fontSize: "12px" }}>
              {time}
            </Typography>
          </Box>
        )
      )}
    </Box>
  );
};

export const EventProvider = ({ children }: EventProviderProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [dialogType, setDialogType] =
    useState<
      | "create"
      | "edit"
      | "delete"
      | "edit-list"
      | "delete-list"
      | "download "
      | null
    >(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<FormData>({
    event: null,
    transport: null,
    time: "Journée Entière",
    days: [],
  });

  const addEvent = useCallback((event: Omit<Event, "id">) => {
    setEvents((prev) => {
      const eventDate = new Date(event.day);
      const dayOfWeek = eventDate.getDay(); // 0 (Sunday) - 6 (Saturday)

      // Prevent adding events on weekends (Saturday = 6, Sunday = 0)
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        toast.error("You cannot add events on weekends.");
        return prev;
      }

      const existingEvents = prev.filter((e) => e.day === event.day);

      // Check for conflicts
      const hasFullDay = existingEvents.some(
        (e) => e.time === "Journée Entière"
      );
      const hasMorning = existingEvents.some((e) => e.time === "Avant-Midi");
      const hasAfternoon = existingEvents.some((e) => e.time === "Après-Midi");

      // Limit total events to 2 per weekday (unless adding a unique time slot)
      if (existingEvents.length >= 2) {
        if (event.time === "Avant-Midi" && !hasMorning) {
          // Allow if it's a unique morning slot
        } else if (event.time === "Après-Midi" && !hasAfternoon) {
          // Allow if it's a unique afternoon slot
        } else {
          toast.error("You cannot add more than 2 events on the same weekday.");
          return prev;
        }
      }

      // Full-day event cannot be added if any event exists on the day
      if (event.time === "Journée Entière" && hasFullDay) {
        toast.error(
          "You cannot add a Full Day event when other events exist on this day."
        );
        return prev;
      }

      // Prevent adding duplicate time slots
      if (event.time === "Avant-Midi" && hasMorning) {
        toast.error("A morning event already exists on this day.");
        return prev;
      }

      if (event.time === "Après-Midi" && hasAfternoon) {
        toast.error("An afternoon event already exists on this day.");
        return prev;
      }

      return [...prev, { ...event, id: uuidv4() }];
    });
  }, []);

  const updateEvent = useCallback((updatedEvent: Event) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
    );
  }, []);

  const deleteEvent = useCallback((eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
  }, []);
  const handleCloseWithReset = useCallback(() => {
    setFormData({
      event: null,
      transport: null,
      time: "Journée Entière",
      days: [],
    });

    setDialogType(null);
  }, []);

  const value = {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    dialogType,
    setDialogType,
    selectedEvent,
    setSelectedEvent,
    formData,
    setFormData,
    handleCloseWithReset,
  };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};

const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
};
const CustomEvent = ({ event }: { event: AdjustedEvent }) => {
  const [transportLogo, setTransportLogo] =
    useState<React.ElementType | null>(null);

  useEffect(() => {
    switch (event.transport) {
      case "Vélo/Bicyclette":
        setTransportLogo(DirectionsBikeIcon);
        break;
      case "Transport en Commun":
        setTransportLogo(DirectionsBusIcon);
        break;
      case "À pied":
        setTransportLogo(DirectionsWalkIcon);
        break;
      case "Télétravail":
        setTransportLogo(HomeIcon);
        break;
      case "Véhicule motorisé":
        setTransportLogo(DirectionsCarIcon);
        break;
      default:
        setTransportLogo(null);
        break;
    }
  }, [event.transport]);
  return event.isDayOff ? (
    <Tooltip
      title={
        <>
          <Box>
            {event.note ? (
              <>
                <Typography
                  fontSize="0.8rem"
                  fontWeight="600"
                  component="strong"
                >
                  Note:{" "}
                </Typography>
                {event.note}
              </>
            ) : (
              <Typography>{event.status}</Typography>
            )}
          </Box>
        </>
      }
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        sx={{
          cursor: "auto",
          // height: event.period === "Journée Entière" ? "60px" : "inherit",
        }}
      >
        {event.status === "sick" && (
          <LocalHospitalIcon fontSize="small" sx={{ mr: 1 }} />
        )}
        {event.status === "vacation" && (
          <BeachAccessIcon fontSize="small" sx={{ mr: 1 }} />
        )}
        {event.status === "other" && (
          <EventNoteIcon fontSize="small" sx={{ mr: 1 }} />
        )}
        <Typography fontSize="0.8rem" component="span">
          {event.title}
        </Typography>
      </Stack>
    </Tooltip>
  ) : (
    <Tooltip
      title={
        <Box p="15px">
          <Typography fontSize="0.8rem">
            <Typography fontSize="inherit" fontWeight="600" component="strong">
              Mission Type:{" "}
            </Typography>
            {event.missionType}
          </Typography>
          <Typography fontSize="0.8rem">
            <Typography fontSize="inherit" fontWeight="600" component="strong">
              Transport:{" "}
            </Typography>
            {event.transport}
          </Typography>
          <Typography fontSize="0.8rem">
            <Typography fontSize="inherit" fontWeight="600" component="strong">
              Time Option:{" "}
            </Typography>
            {event.time}
          </Typography>
        </Box>
      }
    >
      <Stack flexDirection="row" alignItems="center">
        {transportLogo &&
          React.createElement(transportLogo, { fontSize: "small" })}

        <Typography fontSize="0.8rem" pl="0.4rem">
          {" "}
          {event.title}
        </Typography>
      </Stack>
    </Tooltip>
  );
};

const SelectionCard = memo(
  ({ value, selected, onClick, children }: SelectionCardProps) => {
    const objectValue = typeof value === "object" && value !== null;
    const backgroundColor = selected
      ? typeof value === "string"
        ? timeColors[value] || "rgba(0, 0, 255, 0.3)"
        : timeColors[value.tache] || "rgba(0, 0, 255, 0.3)"
      : "transparent";

    return (
      <Card
        onClick={onClick}
        sx={{
          cursor: "pointer",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: selected ? "2px solid" : "1px solid rgba(0, 0, 0, 0.12)",
          borderColor: selected ? "primary.main" : "transparent",
          backgroundColor: backgroundColor,
          "&:hover": { boxShadow: 2 },
        }}
        role="button"
        tabIndex={0}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
          {objectValue ? (
            <>
              <Typography fontSize="0.8rem" align="center" color="lightblue">
                {value.client}
              </Typography>
              <Typography fontSize="0.8rem" align="center">
                {value.project}
              </Typography>
              <Typography fontSize="0.8rem" align="center">
                {value.tache}
              </Typography>
            </>
          ) : (
            <Typography variant="subtitle1" align="center">
              {value}
            </Typography>
          )}
        </CardContent>
      </Card>
    );
  }
);

const StepAccordion = memo(
  ({
    title,
    expanded,
    panel,
    onExpand,
    children,
    selectedOption,
  }: StepAccordionProps) => (
    <Accordion expanded={expanded === panel} onChange={onExpand(panel)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle1">
          {title} {title === "Select Days" && "(facultatif)"}
          {selectedOption &&
            panel !== "days" &&
            (typeof selectedOption === "object" ? (
              <Box component="span" style={{ color: "blue" }}>
                ({selectedOption.project})
              </Box>
            ) : (
              <Box component="span" style={{ color: "blue" }}>
                ({selectedOption})
              </Box>
            ))}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  )
);

const EventDialog = memo(
  ({ open, handleClose, mode, eventToEdit }: EventDialogProps) => {
    const {
      events,
      addEvent,
      updateEvent,
      formData,
      setFormData,
      handleCloseWithReset,
    } = useEvent() as EventContextType;
    const [selectedMonth, setSelectedMonth] = useState<number>(
      new Date().getMonth()
    );

    const theme = useTheme();

    const [expanded, setExpanded] = useState<string | false>("event");

    useEffect(() => {
      if (mode === "edit" && eventToEdit) {
        setFormData({
          event: eventToEdit.event,
          transport: eventToEdit.transport,
          time: eventToEdit.time,
          day: eventToEdit.day,
        });
      } else if (mode === "create") {
        setFormData({
          event: null,
          transport: null,
          time: "Journée Entière",
          days: [],
        });
      }
    }, [mode, eventToEdit, setFormData]);

    const updateData = (key: keyof FormData, value: string | MissionType) => {
      setFormData((prev: FormData) => ({ ...prev, [key]: value }));
    };

    const handleConfirm = () => {
      if (!formData.event || !formData.transport || !formData.time) return;

      const isCreating = mode === "create";
      const selectedDays = isCreating
        ? formData.days?.length
          ? formData.days.filter(Boolean)
          : [new Date().toISOString()]
        : ([eventToEdit?.day].filter(Boolean) as string[]);

      const conflictExists = (
        day: string,
        newTime: string,
        excludeId?: string
      ) => {
        const existingEvents = events.filter(
          (event) => event.day === day && event.id !== excludeId
        );

        const dayOffConflicts = daysOff.filter((dayOff) => {
          const dayOffDate = adjustToLocalTime(dayOff.date).toLocaleDateString(
            "fr-CA"
          );
          const currentDay = adjustToLocalTime(day).toLocaleDateString("fr-CA");

          if (dayOffDate !== currentDay) return false;

          return (
            dayOff.period === "Journée Entière" ||
            dayOff.period === newTime ||
            (newTime === "Journée Entière" && dayOff.period)
          );
        });

        if (dayOffConflicts.length > 0) return true;

        const hasAvantMidi = existingEvents.some(
          (event) => event.time === "Avant-Midi"
        );
        const hasApresMidi = existingEvents.some(
          (event) => event.time === "Après-Midi"
        );
        const hasJourneeEntiere = existingEvents.some(
          (event) => event.time === "Journée Entière"
        );
        const hasSameTime = existingEvents.some(
          (event) => event.time === newTime
        );

        if (hasSameTime) return true; // Prevent duplicates of the same time slot

        return (
          (newTime === "Journée Entière" && (hasAvantMidi || hasApresMidi)) ||
          ((newTime === "Avant-Midi" || newTime === "Après-Midi") &&
            hasJourneeEntiere)
        );
      };

      for (const day of selectedDays) {
        if (
          conflictExists(
            day,
            formData.time,
            isCreating ? undefined : eventToEdit?.id
          )
        ) {
          toast.error(
            `Cannot assign '${formData.time}' on ${day} because it already exists or conflicts with another event.`
          );
          return;
        }

        if (isCreating) {
          addEvent({
            event: formData.event,
            transport: formData.transport,
            time: formData.time,
            day,
          });
        } else {
          updateEvent({
            id: eventToEdit!.id,
            event: formData.event,
            transport: formData.transport,
            time: formData.time,
            day: formData.day || eventToEdit!.day,
          });
        }
      }

      handleClose();
    };

    const disabledDays = [
      ...events
        .filter((event) => event.time === "Journée Entière")
        .map((event) =>
          adjustToLocalTime(event.day).toLocaleDateString("fr-CA")
        ),
      ...daysOff
        .filter((dayOff) => dayOff.period === "Journée Entière")
        .map((dayOff) =>
          adjustToLocalTime(dayOff.date).toLocaleDateString("fr-CA")
        ),
    ];
    // Check for days with both "Avant-Midi" and "Après-Midi" events
    const daysWithTwoEvents = events.reduce((acc, event) => {
      const dayISO = adjustToLocalTime(event.day).toLocaleDateString("fr-CA");
      if (!acc[dayISO]) {
        acc[dayISO] = [];
      }
      acc[dayISO].push(event.time);
      return acc;
    }, {} as Record<string, string[]>);

    const additionalDisabledDays = Object.keys(daysWithTwoEvents).filter(
      (day) =>
        daysWithTwoEvents[day].includes("Avant-Midi") &&
        daysWithTwoEvents[day].includes("Après-Midi")
    );

    const daysWithHalfDayEventsOrOffDays = events.reduce((acc, event) => {
      const dayISO = adjustToLocalTime(event.day).toLocaleDateString("fr-CA");
      if (!acc[dayISO]) {
        acc[dayISO] = [];
      }
      acc[dayISO].push(event.time);
      return acc;
    }, {} as Record<string, string[]>);

    daysOff.forEach((dayOff) => {
      const dayISO = adjustToLocalTime(dayOff.date).toLocaleDateString("fr-CA");
      if (!daysWithHalfDayEventsOrOffDays[dayISO]) {
        daysWithHalfDayEventsOrOffDays[dayISO] = [];
      }
      daysWithHalfDayEventsOrOffDays[dayISO].push(dayOff.period);
    });

    const getRemainingHalfDay = (dayISO: string) => {
      const times = daysWithHalfDayEventsOrOffDays[dayISO] || [];
      if (times.includes("Avant-Midi") && !times.includes("Après-Midi")) {
        return "(Après-Midi left)";
      }
      if (times.includes("Après-Midi") && !times.includes("Avant-Midi")) {
        return "(Avant-Midi left)";
      }
      return "";
    };

    const daysOffDisabledDays = [...daysOff]
      .filter((dayOff) => dayOff.period === "Journée Entière")
      .map((dayOff) =>
        adjustToLocalTime(dayOff.date).toLocaleDateString("fr-CA")
      );

    const allDisabledDays = [
      ...disabledDays,
      ...additionalDisabledDays,
      ...daysOffDisabledDays,
    ];

    const daysInMonth = eachDayOfInterval({
      start: startOfMonth(new Date()),
      end: endOfMonth(new Date()),
    })
      .filter((day) => !isWeekend(day))
      .map((day) => day.toISOString());

    const isButtonDisabled =
      mode === "create"
        ? !formData.event || !formData.transport || !formData.time
        : !formData.event || !formData.transport || !formData.time;

    const daysListDisabledLogic = (dayISO: string) => {
      return (
        allDisabledDays.includes(dayISO) ||
        (formData.time === "Journée Entière" &&
          (daysWithTwoEvents[dayISO]?.includes("Avant-Midi") ||
            daysWithTwoEvents[dayISO]?.includes("Après-Midi") ||
            daysWithHalfDayEventsOrOffDays[dayISO]?.includes("Avant-Midi") ||
            daysWithHalfDayEventsOrOffDays[dayISO]?.includes("Après-Midi"))) ||
        (formData.time === "Avant-Midi" &&
          daysWithHalfDayEventsOrOffDays[dayISO]?.includes("Avant-Midi")) ||
        (formData.time === "Après-Midi" &&
          daysWithHalfDayEventsOrOffDays[dayISO]?.includes("Après-Midi"))
      );
    };

    const handleSelectAllDays = () => {
      const nonDisabledDays = daysInMonth
        .map((dayISO) => adjustToLocalTime(dayISO).toLocaleDateString("fr-CA"))
        .filter((dayISO) => !daysListDisabledLogic(dayISO));

      if (nonDisabledDays.every((day) => formData.days.includes(day))) {
        // Uncheck all days
        updateData("days", []);
      } else {
        // Check all non-disabled days
        updateData("days", nonDisabledDays);
      }
    };

    return (
      <Dialog
        open={open}
        onClose={handleCloseWithReset}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              color={theme.palette.orange.main}
              fontWeight="700"
              fontSize="1.5rem"
            >
              {mode === "download"
                ? "Télécharger les événements"
                : mode === "create"
                ? "Créer un nouvel événement"
                : "Modifier l'événement"}
            </Typography>
            <IconButton onClick={handleCloseWithReset} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          {mode === "download" ? (
            // Show only month selector and download button in "download" mode
            <>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Sélectionner un mois :
              </Typography>
              <Select
                fullWidth
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
              >
                {[...Array(12)].map((_, index) => {
                  const currentYear = new Date().getFullYear();
                  const currentMonth = new Date().getMonth();
                  const isCurrentMonth = index === currentMonth;
                  const isDisabled = index > currentMonth; // Disable future months

                  return (
                    <MenuItem
                      key={index}
                      value={index}
                      disabled={isDisabled}
                      sx={{
                        fontWeight: isCurrentMonth ? "bold" : "normal",
                        color: isCurrentMonth
                          ? theme.palette.orange.main
                          : "inherit",
                      }}
                    >
                      {format(new Date(currentYear, index), "MMMM yyyy", {
                        locale: fr,
                      })}
                    </MenuItem>
                  );
                })}
              </Select>

              <Button
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3 }}
                // onClick={downloadPDF}
                // disabled={!isMonthComplete}
              >
                Télécharger le PDF
              </Button>
            </>
          ) : (
            <>
              <StepAccordion
                title="Select Event Type"
                expanded={expanded}
                panel="event"
                onExpand={(panel) => (_, isExpanded) => {
                  setExpanded(isExpanded ? panel : false);
                }}
                selectedOption={formData.event}
              >
                <Grid container spacing={2}>
                  {missionTypes.map((event) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={event.tache}>
                      <SelectionCard
                        value={event}
                        selected={formData.event === event}
                        onClick={() => {
                          updateData("event", event);
                          setExpanded("transport");
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </StepAccordion>

              <StepAccordion
                title="Select Transportation"
                expanded={expanded}
                panel="transport"
                onExpand={(panel) => (_, isExpanded) =>
                  setExpanded(isExpanded ? panel : false)}
                selectedOption={formData.transport}
              >
                <Grid container spacing={2}>
                  {transportationOptions.map(({ label, icon }) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={label}>
                      <SelectionCard
                        value={label}
                        selected={formData.transport === label}
                        onClick={() => {
                          updateData("transport", label);
                          setExpanded("time");
                        }}
                      >
                        {icon}
                      </SelectionCard>
                    </Grid>
                  ))}
                </Grid>
              </StepAccordion>

              <StepAccordion
                title="Select Time Slot"
                expanded={expanded}
                panel="time"
                onExpand={(panel) => (_, isExpanded) =>
                  setExpanded(isExpanded ? panel : false)}
                selectedOption={formData.time}
              >
                <Grid container spacing={2}>
                  {timeOptions.map(({ label, icon }) => (
                    <Grid size={{ xs: 12, sm: 4 }} key={label}>
                      <SelectionCard
                        value={label}
                        selected={formData.time === label}
                        onClick={() => {
                          updateData("time", label);
                        }}
                      >
                        {icon}
                      </SelectionCard>
                    </Grid>
                  ))}
                </Grid>
              </StepAccordion>

              {mode === "create" && (
                <StepAccordion
                  title="Select Days"
                  expanded={expanded}
                  panel="days"
                  onExpand={(panel) => (_, isExpanded) =>
                    setExpanded(isExpanded ? panel : false)}
                >
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        p: "8px",
                      }}
                      onClick={handleSelectAllDays}
                    >
                      <Checkbox
                        checked={daysInMonth
                          .map((dayISO) =>
                            adjustToLocalTime(dayISO).toLocaleDateString(
                              "fr-CA"
                            )
                          )
                          .filter((dayISO) => !daysListDisabledLogic(dayISO))
                          .every((day) => formData.days.includes(day))}
                        color="primary"
                      />
                      <Typography variant="body1" minWidth="94px">
                        Tous
                      </Typography>
                    </Box>
                    {daysInMonth
                      .map((dayISO) => adjustToLocalTime(dayISO))
                      .map((day) => {
                        const dayISO = day.toLocaleDateString("fr-CA");
                        const isDisabled = daysListDisabledLogic(dayISO);
                        const halfDayText = getRemainingHalfDay(dayISO);

                        return (
                          <Box
                            key={dayISO}
                            sx={{
                              position: "relative",
                              display: "flex",
                              alignItems: "center",
                              backgroundColor: formData.days?.includes(dayISO)
                                ? "rgba(0, 0, 255, 0.1)"
                                : "transparent",
                              borderRadius: 1,
                              p: 1,
                              cursor: isDisabled ? "not-allowed" : "pointer",
                              opacity: isDisabled ? 0.6 : 1,
                              "&.Mui-checked": {
                                color: "orange",
                              },
                            }}
                            onClick={() => {
                              if (!isDisabled) {
                                updateData(
                                  "days",
                                  formData.days?.includes(dayISO)
                                    ? formData.days.filter((d) => d !== dayISO)
                                    : [...formData.days, dayISO]
                                );
                              }
                            }}
                          >
                            <Checkbox
                              checked={formData.days?.includes(dayISO) ?? false}
                              color="primary"
                              disabled={isDisabled}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!isDisabled) {
                                  updateData(
                                    "days",
                                    formData.days?.includes(dayISO)
                                      ? formData.days.filter(
                                          (d) => d !== dayISO
                                        )
                                      : [...formData.days, dayISO]
                                  );
                                }
                              }}
                            />
                            <Typography variant="body1">
                              {format(day, "dd MMM yyyy", { locale: fr })}
                              <br />
                              <Typography
                                variant="caption"
                                component="span"
                                sx={{
                                  fontSize: "0.75rem",
                                  position: "absolute",
                                }}
                              >
                                {halfDayText}
                              </Typography>
                            </Typography>
                          </Box>
                        );
                      })}
                  </Box>
                </StepAccordion>
              )}
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                onClick={handleConfirm}
                disabled={isButtonDisabled}
              >
                {mode === "create" ? "Confirm Event" : "Save Changes"}
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    );
  }
);

const EventListDialog = memo(
  ({ open, onClose, mode, onSelect }: EventListDialogProps) => {
    const { events } = useEvent();
    const theme = useTheme();

    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              color={theme.palette.orange.main}
              fontWeight="700"
              fontSize="1.5rem"
            >
              {mode === "edit"
                ? "Select Event to Edit"
                : "Select Event to Delete"}
            </Typography>
            <IconButton onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2}>
            {events
              .sort(
                (a, b) => new Date(a.day).getTime() - new Date(b.day).getTime()
              )
              .map((event) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={event.id}>
                  <Card
                    sx={{
                      mb: 2,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {event.event.client} - {event.event.tache}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Transport: {event.transport}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Time: {event.time}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Day:{" "}
                        {format(new Date(event.day), "dd MMM yyyy", {
                          locale: fr,
                        })}
                      </Typography>
                    </CardContent>
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button
                        onClick={() => onSelect(event)}
                        variant="contained"
                        color={mode === "edit" ? "primary" : "error"}
                        fullWidth
                      >
                        {mode === "edit" ? "Edit" : "Delete"}
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            {events.length === 0 && (
              <Grid size={12}>
                <Typography>No events to display.</Typography>
              </Grid>
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
);

const EventPlanner = () => {
  const {
    events,
    deleteEvent,
    dialogType,
    setDialogType,
    selectedEvent,
    setSelectedEvent,
    handleCloseWithReset,
  } = useEvent();
  const { isMobile } = useUserContext();
  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setDialogType("edit");
  };

  const handleDeleteEvent = (event: Event) => {
    deleteEvent(event.id);
    setDialogType(null);
  };

  const adjustedEvents = events.map((event) => {
    const day = adjustToLocalTime(event.day);
    // eslint-disable-next-line prefer-const
    let start = new Date(day);
    // eslint-disable-next-line prefer-const
    let end = new Date(day);

    switch (event.time) {
      case "Avant-Midi":
        start.setHours(9, 0, 0); // 9:00 AM
        end.setHours(12, 0, 0); // 12:00 PM
        break;
      case "Après-Midi":
        start.setHours(13, 0, 0); // 1:00 PM
        end.setHours(18, 0, 0); // 6:00 PM
        break;
      case "Journée Entière":
        start.setHours(9, 0, 0); // 9:00 AM
        end.setHours(18, 0, 0); // 6:00 PM
        break;
      default:
        break;
    }

    return {
      title: `${event.event.client} - ${event.event.tache}`,
      start: start,
      end: end,
      color: timeColors[event.time],
      missionType: event.event.client,
      transport: event.transport,
      time: event.time,
      isDayOff: false,
    };
  });

  const daysOffEvents = daysOff.map((dayOff) => {
    const day = adjustToLocalTime(dayOff.date);
    // eslint-disable-next-line prefer-const
    let start = new Date(day);
    // eslint-disable-next-line prefer-const
    let end = new Date(day);

    switch (dayOff.period) {
      case "Avant-Midi":
        start.setHours(9, 0, 0);
        end.setHours(12, 0, 0);
        break;
      case "Après-Midi":
        start.setHours(13, 0, 0);
        end.setHours(18, 0, 0);
        break;
      case "Journée Entière":
        start.setHours(9, 0, 0);
        end.setHours(18, 0, 0);
        break;
      default:
        break;
    }

    const dayOffEvent = {
      title: dayOff.status,
      start: start,
      end: end,
      color: dayOffColors[dayOff.status],
      missionType: "", // Add default values for missing properties
      transport: "",
      time: "",
      isDayOff: true,
      status: dayOff.status,
      period: dayOff.period,
      note: dayOff.note,
    };

    return dayOffEvent;
  });

  const firstDayOfMonth = useMemo(() => {
    const date = new Date();
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return date;
  }, [events]);

  // const transformEvents = (events) => {
  //   return events.flatMap((event) => {
  //     if (event.period === "Journée Entière") {
  //       return [{ ...event }];
  //     }

  //     if (event.period === "Avant-Midi") {
  //       return [
  //         { ...event },
  //         {
  //           ...event,
  //           id: `${event.id}-pm`,
  //           title: "After",
  //           color: "rgba(0,0,0,0.1)", // Make it slightly visible instead of fully transparent
  //           borderStyle: "dashed",
  //           start: new Date(
  //             event.start.getFullYear(),
  //             event.start.getMonth(),
  //             event.start.getDate(),
  //             13,
  //             0,
  //             0
  //           ),
  //           end: new Date(
  //             event.start.getFullYear(),
  //             event.start.getMonth(),
  //             event.start.getDate(),
  //             18,
  //             0,
  //             0
  //           ),
  //         },
  //       ];
  //     }

  //     if (event.period === "Après-Midi") {
  //       return [
  //         {
  //           ...event,
  //           id: `${event.id}-am`,
  //           title: "Before",
  //           color: "rgba(0,0,0,0.1)",
  //           borderStyle: "dashed",
  //           start: new Date(
  //             event.start.getFullYear(),
  //             event.start.getMonth(),
  //             event.start.getDate(),
  //             9,
  //             0,
  //             0
  //           ),
  //           end: new Date(
  //             event.start.getFullYear(),
  //             event.start.getMonth(),
  //             event.start.getDate(),
  //             12,
  //             0,
  //             0
  //           ),
  //         },
  //         { ...event },
  //       ];
  //     }

  //     return [{ ...event }];
  //   });
  // };

  // // Apply the transformation before passing the events to the calendar
  // const formatedEvents = transformEvents([...adjustedEvents, ...daysOffEvents]);

  return (
    <>
      <EventDialog
        open={dialogType === "create"}
        handleClose={handleCloseWithReset}
        mode="create"
      />
      <EventListDialog
        open={dialogType === "edit-list"}
        onClose={handleCloseWithReset}
        mode="edit"
        onSelect={handleSelectEvent}
      />

      <EventListDialog
        open={dialogType === "delete-list"}
        onClose={handleCloseWithReset}
        mode="delete"
        onSelect={handleDeleteEvent}
      />
      <EventDialog
        open={dialogType === "edit"}
        handleClose={handleCloseWithReset}
        mode="edit"
        eventToEdit={selectedEvent}
      />

      <EventDialog
        open={dialogType === "download"}
        handleClose={handleCloseWithReset}
        mode="download"
      />

      <Box
        sx={{ mt: { xs: 1, md: 0 }, p: 2, pb: "8rem", position: "relative" }}
      >
        <EventProgress events={events} daysOff={daysOff} />

        <Calendar
          localizer={localizer}
          events={[...adjustedEvents, ...daysOffEvents]}
          startAccessor="start"
          endAccessor="end"
          defaultDate={firstDayOfMonth}
          style={{ height: isMobile ? 760 : 600 }}
          views={["month", "week", "agenda"]}
          culture="fr"
          messages={messages}
          min={new Date(1970, 1, 1, 9, 0, 0)}
          max={new Date(1970, 1, 1, 18, 0, 0)}
          components={{
            event: CustomEvent,
            toolbar: CustomToolbar,
          }}
          eventPropGetter={(event) => {
            const backgroundColor = event.color;
            return { style: { backgroundColor } };
          }}
          className="custom-calendar"
        />
        <CalendarCaption />

        <SpeedDial
          ariaLabel="Event planner speed dial"
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            transition: "transform 0.3s ease",
          }}
          icon={<AddIcon />}
        >
          <SpeedDialAction
            icon={<EventIcon />}
            tooltipTitle="Créer un événement"
            onClick={() => setDialogType("create")}
          />
          <SpeedDialAction
            icon={<EditIcon />}
            tooltipTitle="Modifier l'événement"
            onClick={() => setDialogType("edit-list")}
          />
          <SpeedDialAction
            icon={<DeleteIcon />}
            tooltipTitle="Supprimer l'événement"
            onClick={() => setDialogType("delete-list")}
          />
          <SpeedDialAction
            icon={<Download />}
            tooltipTitle="Telecharger PDF"
            onClick={() => setDialogType("download")}
          />
        </SpeedDial>
      </Box>
    </>
  );
};

export default EventPlanner;
