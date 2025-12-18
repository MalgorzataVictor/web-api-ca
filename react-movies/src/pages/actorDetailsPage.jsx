import React from "react";
import { useParams } from "react-router";
import PageTemplate from "../components/templateActorPage";
import { getActor, getActorCredits } from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import ActorDetails from "../components/actorDetails";
import { Helmet } from "react-helmet-async";

const ActorPage = () => {
    const { id } = useParams();

    const { data: actor, error, isPending, isError } = useQuery({
        queryKey: ["actor", { id }],
        queryFn: getActor,
    });

    const {
        data: actCredits, error: actError, isPending: actPending, isError: actIsError } = useQuery({
            queryKey: ["actorCredits", { id }],
            queryFn: getActorCredits,
        });

    if (isPending || actPending) return <Spinner />;
    if (isError) return <h1>{error.message}</h1>;
    if (actIsError) return <h1>{actError.message}</h1>;

    return (
        <>
            <Helmet>
                <title>{actor ? actor.name : "Actor Page"}</title>
            </Helmet>
            {actor ? (
                <PageTemplate actor={actor}>
                    <ActorDetails
                        actor={actor}
                        actCredits={actCredits || null}
                    />
                </PageTemplate>
            ) : (
                <p>Waiting for actor details</p>
            )}
        </>
    );
};

export default ActorPage;
